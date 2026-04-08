/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  User,
  MapPin,
  GraduationCap,
  Wrench,
  Shield,
  Loader2,
  RefreshCw,
  CreditCard,
} from "lucide-react";
import { Button } from "./Button";
import {
  vocationalSkills,
  educationalQualifications,
  disciplines,
} from "@/data/locationData";
import {
  useGetAllDatabaseWards,
  useSubmitApplications,
} from "@/services/tanstack";
import { useAlert } from "next-alert";
import { SubmitLoader } from "./SubmitLoader";
import { ValidationErrorModal } from "./ValidationErrorModal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NinRecord {
  firstName: string;
  surname: string;
  otherName?: string;
  dob: string;
  gender: string;
  phone: string;
  stateOfOrigin: string;
}

interface RegistrationFormProps {
  onSuccess: () => void;
  nin: string;
  ninData: NinRecord;
  onChangeNin: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = {
  "application/pdf": ".pdf",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
};

const isFileSizeValid = (file: any) => file.size <= MAX_FILE_SIZE_BYTES;
const isFileTypeValid = (file: any) =>
  Object.keys(ALLOWED_FILE_TYPES).includes(file.type);

// ─── Validation ───────────────────────────────────────────────────────────────

const validationSchema = Yup.object({
  surname: Yup.string().required("Surname is required"),
  firstName: Yup.string().required("First name is required"),
  otherName: Yup.string(),
  gender: Yup.string().required("Please select your gender"),
  phoneNumber: Yup.string()
    .matches(
      /^0[0-9]{10}$/,
      "Enter a valid 11-digit phone number starting with 0",
    )
    .required("Phone number is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Enter a valid email address"),
  vin: Yup.string()
    .min(19, "VIN must be at least 19 characters")
    .required("Voter Identification Number (VIN) is required"),
  ward: Yup.string().required("Please select your ward"),
  village: Yup.string().required("Please select your village"),
  hasEducation: Yup.string().required("Please indicate your education status"),
  highestQualification: Yup.string().when("hasEducation", {
    is: "yes",
    then: (schema) =>
      schema.required("Please select your highest qualification"),
  }),
  discipline: Yup.string().when("hasEducation", {
    is: "yes",
    then: (schema) => schema.required("Please select your discipline"),
  }),
  otherDiscipline: Yup.string().when("discipline", {
    is: "Other",
    then: (schema) => schema.required("Please specify your discipline"),
  }),
  certificate: Yup.mixed()
    .nullable()
    .when("hasEducation", {
      is: "yes",
      then: (schema) =>
        schema
          .test(
            "fileSize",
            `File size must not be more than ${MAX_FILE_SIZE_MB}MB`,
            (value) => {
              if (!value) return true;
              return isFileSizeValid(value);
            },
          )
          .test(
            "fileType",
            "Only PDF, JPG, JPEG and PNG files are allowed",
            (value) => {
              if (!value) return true;
              return isFileTypeValid(value);
            },
          ),
    }),
  vocationalSkill: Yup.string().required("Please select a skill"),
  otherSkill: Yup.string().when("vocationalSkill", {
    is: "Other",
    then: (schema) => schema.required("Please specify your skill"),
  }),
  skillAcquisition: Yup.string(),
  otherSkillAcquisition: Yup.string().when("skillAcquisition", {
    is: "Other",
    then: (schema) =>
      schema.required("Please specify the skill you want to learn"),
  }),
  villageHeadName: Yup.string().required("Village head name is required"),
  villageHeadPhone: Yup.string()
    .matches(
      /^0[0-9]{10}$/,
      "Enter a valid 11-digit phone number starting with 0",
    )
    .required("Village head phone number is required"),
  certificateOfOrigin: Yup.mixed()
    .nullable()
    .required("Please upload your Certificate of Origin")
    .test(
      "fileSize",
      `File size must not be more than ${MAX_FILE_SIZE_MB}MB`,
      (value) => {
        if (!value) return true;
        return isFileSizeValid(value);
      },
    )
    .test(
      "fileType",
      "Only PDF, JPG, JPEG and PNG files are allowed",
      (value) => {
        if (!value) return true;
        return isFileTypeValid(value);
      },
    ),
});

// ─── Reusable sub-components ──────────────────────────────────────────────────

const CardHeader = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <div className="bg-linear-to-br from-[#f5f9f6] to-[#edf4ef] border-b border-[#e0ebe4] px-6 py-4 flex items-center gap-3">
    <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#00572f] to-[#007a44] flex items-center justify-center shrink-0 shadow-md">
      {icon}
    </div>
    <div>
      <h3 className="font-['Playfair_Display'] text-base font-bold text-[#00572f] leading-tight">
        {title}
      </h3>
      <p className="font-['DM_Sans'] text-xs text-[#6b8a78] mt-0.5">
        {subtitle}
      </p>
    </div>
  </div>
);

const FieldLabel = ({
  children,
  required,
  optional,
}: {
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) => (
  <label className="block font-['DM_Sans'] text-sm font-semibold text-[#1a3d2b] mb-1.5">
    {children}
    {required && <span className="text-[#ef4343] ml-0.5">*</span>}
    {optional && (
      <span className="text-[#8aab98] font-normal text-[11px] ml-1">
        (Optional)
      </span>
    )}
  </label>
);

const inputClass =
  "w-full text-[#112219] px-3.5 py-2.5 border-[1.5px] border-[#d3ded9] rounded-xl bg-[#fafcfb] font-['DM_Sans'] text-sm outline-none focus:border-[#00572f] focus:ring-4 focus:ring-[#00572f]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#aabdb4]";

const FieldError = ({ name }: { name: string }) => (
  <ErrorMessage
    name={name}
    component="p"
    className="font-['DM_Sans'] text-xs text-[#ef4343] mt-1"
  />
);

const UploadZone = ({
  fileName,
  icon,
  label,
  hint,
  onChange,
}: {
  fileName?: string;
  icon: React.ReactNode;
  label: string;
  hint: string;
  onChange: (file: File | null) => void;
}) => (
  <label className="block w-full border-2 border-dashed border-[#c0d9ca] rounded-xl p-5 text-center bg-[#f8fbf9] cursor-pointer hover:border-[#00572f] hover:bg-[#edf5f0] transition-all">
    <input
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      className="hidden"
      onChange={(e) => onChange(e.target.files?.[0] || null)}
    />
    <div className="pointer-events-none">
      <div className="w-9 h-9 bg-linear-to-br from-[#00572f] to-[#007a44] rounded-full flex items-center justify-center mx-auto mb-2">
        {icon}
      </div>
      <p className="font-['DM_Sans'] text-sm font-semibold text-[#1a3d2b] mb-0.5">
        {fileName || label}
      </p>
      <p className="font-['DM_Sans'] text-xs text-[#8aab98]">{hint}</p>
    </div>
  </label>
);

// ─── Component ────────────────────────────────────────────────────────────────

export const RegistrationForm = ({
  onSuccess,
  nin,
  ninData,
  onChangeNin,
}: RegistrationFormProps) => {
  const { data: allWards } = useGetAllDatabaseWards();
  const { mutate: submitApplication, isPending } = useSubmitApplications();
  const { addAlert } = useAlert();
  const wards = allWards?.data || [];

  useEffect(() => {
    if (!nin || !ninData) onChangeNin();
  }, [nin, ninData, onChangeNin]);

  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    message: string;
  }>({
    open: false,
    message: "",
  });

  const showError = (message: string) => setErrorModal({ open: true, message });
  const closeError = () => setErrorModal({ open: false, message: "" });

  const initialValues = {
    surname: ninData?.surname ?? "",
    firstName: ninData?.firstName ?? "",
    otherName: ninData?.otherName ?? "",
    gender:
      ninData?.gender?.toLowerCase() === "female"
        ? "female"
        : ninData?.gender?.toLowerCase() === "male"
          ? "male"
          : "",
    phoneNumber: "",
    email: "",
    vin: "",
    ward: "",
    village: "",
    hasEducation: "",
    highestQualification: "",
    discipline: "",
    otherDiscipline: "",
    certificate: null as File | null,
    vocationalSkill: "",
    otherSkill: "",
    skillAcquisition: "",
    otherSkillAcquisition: "",
    villageHeadName: "",
    villageHeadPhone: "",
    certificateOfOrigin: null as File | null,
  };

  const getFirstError = (errors: Record<string, any>): string => {
    const first = Object.values(errors)[0];
    if (typeof first === "string") return first;
    if (typeof first === "object" && first !== null)
      return getFirstError(first);
    return "Please fill in all required fields before submitting.";
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, validateForm }: any,
  ) => {
    const errors = await validateForm(values);
    if (Object.keys(errors).length > 0) {
      showError(getFirstError(errors));
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("nin", nin);
    formData.append("dateOfBirth", ninData.dob);

    Object.entries(values).forEach(([key, value]) => {
      if (key === "certificate" || key === "certificateOfOrigin") {
        if (value instanceof File) formData.append(key, value);
      } else if (value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    submitApplication(formData, {
      onSuccess: () => onSuccess(),
      onError: (error: any) => {
        showError(
          error?.message ?? "An unexpected error occurred. Please try again.",
        );
      },
    });
  };

  const maskNin = (n: string) => `●●●●●●●${n.slice(-4)}`;

  return (
    <>
      {isPending && <SubmitLoader />}

      <ValidationErrorModal
        open={errorModal.open}
        message={errorModal.message}
        onClose={closeError}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => {
          const selectedWard = allWards?.data.find(
            (w: any) => w.id === values.ward,
          );
          const villageOptions = selectedWard ? selectedWard.villages : [];

          return (
            <Form className="space-y-5">
              {/* ── NIN Banner ─────────────────────────────────────────────── */}
              <div className="bg-white rounded-2xl border border-[#e4ede8] shadow-sm overflow-hidden">
                <CardHeader
                  icon={<CreditCard className="w-4 h-4 text-white" />}
                  title="Verified Identity"
                  subtitle="Your NIN has been confirmed for this session"
                />
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 flex-1 min-w-0 bg-[#f0f8f4] border border-[#b8deca] rounded-xl px-4 py-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#00572f] to-[#007a44] flex items-center justify-center shrink-0">
                        <CreditCard className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="font-['DM_Sans'] text-xs text-[#6b8a78] mb-0.5">
                          NIN
                        </p>
                        <p className="font-['DM_Sans'] text-sm font-bold text-[#00572f] tracking-wider tabular-nums">
                          {maskNin(nin)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={onChangeNin}
                      disabled={isPending}
                      className="flex items-center gap-1.5 px-4 py-2.5 border-[1.5px] border-[#d3ded9] rounded-lg bg-white text-[#5c7a69] font-['DM_Sans'] text-sm font-semibold hover:border-[#7db898] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Change NIN
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Personal Information ────────────────────────────────────── */}
              <div className="bg-white rounded-2xl border border-[#e4ede8] shadow-sm overflow-hidden">
                <CardHeader
                  icon={<User className="w-4 h-4 text-white" />}
                  title="Personal Information"
                  subtitle="Tell us your name and how to reach you"
                />
                <div className="px-6 py-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <FieldLabel required>Surname</FieldLabel>
                      <Field
                        name="surname"
                        type="text"
                        placeholder="eg: Akpan"
                        className={inputClass}
                      />
                      <FieldError name="surname" />
                    </div>
                    <div>
                      <FieldLabel required>First Name</FieldLabel>
                      <Field
                        name="firstName"
                        type="text"
                        placeholder="eg: Uduak"
                        className={inputClass}
                      />
                      <FieldError name="firstName" />
                    </div>
                    <div>
                      <FieldLabel optional>Other Name</FieldLabel>
                      <Field
                        name="otherName"
                        type="text"
                        placeholder="eg: Tom"
                        className={inputClass}
                      />
                      <FieldError name="otherName" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['DM_Sans'] text-sm font-semibold text-[#1a3d2b] mb-1.5">
                        Date of Birth
                        <span className="text-[#8aab98] font-normal text-[11px] ml-1">
                          (from NIN — cannot be edited)
                        </span>
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={ninData?.dob ?? ""}
                        className="w-full text-[#1a3d2b] px-3.5 py-2.5 border-[1.5px] border-[#e0ebe4] rounded-xl bg-[#f3f8f5] font-['DM_Sans'] text-sm cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <FieldLabel required>Gender</FieldLabel>
                      <Field as="select" name="gender" className={inputClass}>
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                      <FieldError name="gender" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Phone Number</FieldLabel>
                      <Field
                        name="phoneNumber"
                        type="tel"
                        placeholder="08012345678"
                        className={inputClass}
                      />
                      <FieldError name="phoneNumber" />
                    </div>
                    <div>
                      <FieldLabel optional>Email Address</FieldLabel>
                      <Field
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        className={inputClass}
                      />
                      <FieldError name="email" />
                    </div>
                  </div>

                  <div>
                    <FieldLabel required>
                      Voter Identification Number (VIN)
                    </FieldLabel>
                    <Field
                      name="vin"
                      type="text"
                      placeholder="Enter your 19+ character VIN"
                      className={inputClass}
                    />
                    <FieldError name="vin" />
                    <p className="font-['DM_Sans'] text-xs text-[#8aab98] mt-1">
                      Found on your Permanent Voter's Card (PVC). Must be at
                      least 19 characters.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Location Details ────────────────────────────────────────── */}
              <div className="bg-white rounded-2xl border border-[#e4ede8] shadow-sm overflow-hidden">
                <CardHeader
                  icon={<MapPin className="w-4 h-4 text-white" />}
                  title="Where Are You From?"
                  subtitle="Select your ward and village within Ikot Ekpene"
                />
                <div className="px-6 py-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Ward</FieldLabel>
                      <Field
                        as="select"
                        name="ward"
                        className={inputClass}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                          setFieldValue("ward", e.target.value);
                          setFieldValue("village", "");
                        }}
                      >
                        <option value="">Select your ward</option>
                        {wards.map((w: any) => (
                          <option key={w.id} value={w.id}>
                            {w.name}
                          </option>
                        ))}
                      </Field>
                      <FieldError name="ward" />
                    </div>
                    <div>
                      <FieldLabel required>Village</FieldLabel>
                      <Field
                        as="select"
                        name="village"
                        disabled={!values.ward}
                        className={inputClass}
                      >
                        <option value="">Select your village</option>
                        {villageOptions.map((v: any) => (
                          <option key={v?.id} value={v?.name}>
                            {v?.name}
                          </option>
                        ))}
                      </Field>
                      <FieldError name="village" />
                      {!values.ward && (
                        <p className="font-['DM_Sans'] text-xs text-[#8aab98] mt-1">
                          Select a ward first
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Education ───────────────────────────────────────────────── */}
              <div className="bg-white rounded-2xl border border-[#e4ede8] shadow-sm overflow-hidden">
                <CardHeader
                  icon={<GraduationCap className="w-4 h-4 text-white" />}
                  title="Educational Qualification"
                  subtitle="Have you been to school? Tell us what level you reached"
                />
                <div className="px-6 py-5 space-y-4">
                  <div>
                    <FieldLabel required>
                      Do you have any educational qualification?
                    </FieldLabel>
                    <div className="flex gap-3">
                      {["yes", "no"].map((val) => (
                        <label
                          key={val}
                          className="flex items-center gap-2 px-5 py-2.5 border-[1.5px] border-[#d3ded9] rounded-lg cursor-pointer font-['DM_Sans'] text-sm font-medium text-[#1a3d2b] bg-[#fafcfb] hover:border-[#7db898] transition-all has-checked:border-[#00572f] has-checked:bg-[#edf5f0] has-checked:text-[#00572f]"
                        >
                          <Field
                            type="radio"
                            name="hasEducation"
                            value={val}
                            className="w-4 h-4"
                          />
                          <span className="capitalize">{val}</span>
                        </label>
                      ))}
                    </div>
                    <FieldError name="hasEducation" />
                  </div>

                  {values.hasEducation === "yes" && (
                    <div className="space-y-4 pt-1">
                      <div>
                        <FieldLabel required>Highest Qualification</FieldLabel>
                        <Field
                          as="select"
                          name="highestQualification"
                          className={inputClass}
                        >
                          <option value="">
                            Select your highest qualification
                          </option>
                          {educationalQualifications.map((q) => (
                            <option key={q.id} value={q.id}>
                              {q.label}
                            </option>
                          ))}
                        </Field>
                        <FieldError name="highestQualification" />
                      </div>

                      <div>
                        <FieldLabel required>
                          Discipline / Course of Study
                        </FieldLabel>
                        <Field
                          as="select"
                          name="discipline"
                          className={inputClass}
                        >
                          <option value="">Select your discipline</option>
                          {disciplines.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </Field>
                        <FieldError name="discipline" />
                      </div>

                      {values.discipline === "Other" && (
                        <div>
                          <FieldLabel required>
                            Specify Your Discipline
                          </FieldLabel>
                          <Field
                            name="otherDiscipline"
                            type="text"
                            placeholder="Enter your course of study"
                            className={inputClass}
                          />
                          <FieldError name="otherDiscipline" />
                        </div>
                      )}

                      <div>
                        <FieldLabel optional>Upload Certificate</FieldLabel>
                        <UploadZone
                          fileName={
                            values.certificate
                              ? (values.certificate as File).name
                              : undefined
                          }
                          icon={
                            <GraduationCap className="w-4 h-4 text-white" />
                          }
                          label="Click to upload your certificate"
                          hint="PDF, JPG or PNG — max 5MB"
                          onChange={(file) =>
                            setFieldValue("certificate", file)
                          }
                        />
                        <FieldError name="certificate" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Skills ──────────────────────────────────────────────────── */}
              <div className="bg-white rounded-2xl border border-[#e4ede8] shadow-sm overflow-hidden">
                <CardHeader
                  icon={<Wrench className="w-4 h-4 text-white" />}
                  title="Skill (What skills do you have?)"
                  subtitle="Tell us what you can do and what you'd like to learn"
                />
                <div className="px-6 py-5 space-y-4">
                  <div>
                    <FieldLabel required>Your Primary Skill</FieldLabel>
                    <Field
                      as="select"
                      name="vocationalSkill"
                      className={inputClass}
                    >
                      <option value="">Select your primary skill</option>
                      {vocationalSkills.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Field>
                    <FieldError name="vocationalSkill" />
                  </div>

                  {values.vocationalSkill === "Other" && (
                    <div>
                      <FieldLabel required>Specify Your Skill</FieldLabel>
                      <Field
                        name="otherSkill"
                        type="text"
                        placeholder="Enter your specific skill"
                        className={inputClass}
                      />
                      <FieldError name="otherSkill" />
                    </div>
                  )}

                  <div>
                    <FieldLabel optional>
                      Skill Acquisition (What skills would you like to learn?)
                    </FieldLabel>
                    <Field
                      as="select"
                      name="skillAcquisition"
                      className={inputClass}
                    >
                      <option value="">
                        Select a skill you'd like to learn
                      </option>
                      {vocationalSkills.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Field>
                    <FieldError name="skillAcquisition" />
                  </div>

                  {values.skillAcquisition === "Other" && (
                    <div>
                      <FieldLabel required>Specify Skill to Learn</FieldLabel>
                      <Field
                        name="otherSkillAcquisition"
                        type="text"
                        placeholder="Enter the skill you want to learn"
                        className={inputClass}
                      />
                      <FieldError name="otherSkillAcquisition" />
                    </div>
                  )}
                </div>
              </div>

              {/* ── Village Authority Verification ──────────────────────────── */}
              <div className="bg-white rounded-2xl border border-[#e4ede8] shadow-sm overflow-hidden">
                <CardHeader
                  icon={<Shield className="w-4 h-4 text-white" />}
                  title="Village Authority Verification"
                  subtitle="We need to confirm you are truly from Ikot Ekpene"
                />
                <div className="px-6 py-5 space-y-4">
                  <p className="font-['DM_Sans'] text-sm text-[#5c7166]">
                    Provide the contact details of your village head for
                    verification purposes.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Name of Village Head</FieldLabel>
                      <Field
                        name="villageHeadName"
                        type="text"
                        placeholder="Enter village head's name"
                        className={inputClass}
                      />
                      <FieldError name="villageHeadName" />
                    </div>
                    <div>
                      <FieldLabel required>
                        Phone Number of Village Head
                      </FieldLabel>
                      <Field
                        name="villageHeadPhone"
                        type="tel"
                        placeholder="08012345678"
                        className={inputClass}
                      />
                      <FieldError name="villageHeadPhone" />
                    </div>
                  </div>

                  <div>
                    <FieldLabel required>
                      Upload Certificate of Origin
                    </FieldLabel>
                    <UploadZone
                      fileName={
                        values.certificateOfOrigin
                          ? (values.certificateOfOrigin as File).name
                          : undefined
                      }
                      icon={<Shield className="w-4 h-4 text-white" />}
                      label="Click to upload your Certificate of Origin"
                      hint="PDF, JPG or PNG — max 5MB"
                      onChange={(file) =>
                        setFieldValue("certificateOfOrigin", file)
                      }
                    />
                    <FieldError name="certificateOfOrigin" />
                  </div>
                </div>
              </div>

              {/* ── Submit ──────────────────────────────────────────────────── */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="bg-[#ec7913] hover:bg-[#ec7913]/90 text-white px-8 py-3 text-base font-semibold"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
