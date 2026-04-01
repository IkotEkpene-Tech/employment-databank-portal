/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  /** The verified NIN string from the verification step */
  nin: string;
  /** The full NIN record fetched from Lumiid */
  ninData: NinRecord;
  /** Called when the user wants to change their NIN — navigates back */
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
      "Enter a valid 11-digit phone number starting with 0 (e.g., 08062898015)",
    )
    .required("Phone number is required"),
  email: Yup.string().required("Email is required").email("Enter a valid email address"),
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
  skillAcquisition: Yup.string(), // optional
  otherSkillAcquisition: Yup.string().when("skillAcquisition", {
    is: "Other",
    then: (schema) =>
      schema.required("Please specify the skill you want to learn"),
  }),
  villageHeadName: Yup.string().required("Village head name is required"),
  villageHeadPhone: Yup.string()
    .matches(
      /^0[0-9]{10}$/,
      "Enter a valid 11-digit phone number starting with 0 (e.g., 08062898015)",
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

  // ── Guard: if somehow no NIN, redirect back ─────────────────────────────────
  useEffect(() => {
    if (!nin || !ninData) {
      onChangeNin();
    }
  }, [nin, ninData, onChangeNin]);

  const [errorModal, setErrorModal] = useState<{
    open: boolean;
    message: string;
  }>({ open: false, message: "" });

  const showError = (message: string) => setErrorModal({ open: true, message });
  const closeError = () => setErrorModal({ open: false, message: "" });

  // Pre-fill from NIN data
  const initialValues = {
    surname: ninData?.surname ?? "",
    firstName: ninData?.firstName ?? "",
    otherName: ninData?.otherName ?? "",
    // dob comes from NIN — read-only, not in Formik state (sent separately)
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
      const firstError = getFirstError(errors);
      showError(firstError);
      setSubmitting(false);
      return;
    }

    const formData = new FormData();

    // NIN fields (from verification — not editable)
    formData.append("nin", nin);
    formData.append("dateOfBirth", ninData.dob);

    // All form values
    Object.entries(values).forEach(([key, value]) => {
      if (key === "certificate" || key === "certificateOfOrigin") {
        if (value instanceof File) formData.append(key, value);
      } else if (value !== null && value !== "") {
        if(value === 'email'){
          formData.append(key, String(value).toLowerCase());
        } else {
          formData.append(key, String(value));
        }
      }
    });

    submitApplication(formData, {
      onSuccess: (data: any) => {
        onSuccess();
      },
      onError: (error: any) => {
        showError(
          error?.message ?? "An unexpected error occurred. Please try again.",
        );
      },
    });
  };

  // ── Styles ──────────────────────────────────────────────────────────────────
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');
    .rf-card { background:#fff; border-radius:16px; border:1px solid #e4ede8; box-shadow:0 2px 16px rgba(0,60,30,0.06); overflow:hidden; }
    .rf-card-header { background:linear-gradient(135deg,#f5f9f6 0%,#edf4ef 100%); border-bottom:1px solid #e0ebe4; padding:15px 22px; display:flex; align-items:center; gap:10px; }
    .rf-card-icon { width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,#00572f,#007a44); display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:0 2px 8px rgba(0,87,47,0.25); }
    .rf-card-title { font-family:'Playfair Display',serif; font-size:16px; font-weight:700; color:#00572f; margin:0; line-height:1.2; }
    .rf-card-subtitle { font-family:'DM Sans',sans-serif; font-size:12px; color:#6b8a78; margin:2px 0 0; }
    .rf-card-body { padding:20px 22px 24px; }
    .rf-field-label { display:block; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; color:#1a3d2b; margin-bottom:6px; }
    .rf-input { width:100%; color:#112219; padding:10px 14px; border:1.5px solid #d3ded9; border-radius:10px; background:#fafcfb; font-family:'DM Sans',sans-serif; font-size:14px; outline:none; transition:border-color 0.15s,box-shadow 0.15s; box-sizing:border-box; }
    .rf-input:focus { border-color:#00572f; box-shadow:0 0 0 3px rgba(0,87,47,0.1); }
    .rf-input::placeholder { color:#aabdb4; }
    .rf-input:disabled { opacity:0.5; cursor:not-allowed; }
    .rf-error { font-family:'DM Sans',sans-serif; font-size:12px; color:#ef4343; margin-top:4px; }
    .rf-optional { color:#8aab98; font-weight:400; font-size:11px; margin-left:4px; }
    .rf-radio-pill { display:flex; align-items:center; gap:8px; padding:10px 18px; border:1.5px solid #d3ded9; border-radius:8px; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; color:#1a3d2b; background:#fafcfb; transition:border-color 0.15s,background 0.15s; user-select:none; }
    .rf-radio-pill:has(input:checked) { border-color:#00572f; background:#edf5f0; color:#00572f; }
    .rf-radio-pill:hover { border-color:#7db898; }
    .rf-upload-zone { border:2px dashed #c0d9ca; border-radius:10px; padding:20px; text-align:center; background:#f8fbf9; cursor:pointer; transition:border-color 0.2s,background 0.2s; display:block; width:100%; box-sizing:border-box; }
    .rf-upload-zone:hover { border-color:#00572f; background:#edf5f0; }
    .rf-nin-pill { display:flex; align-items:center; gap:10px; background:#f0f8f4; border:1.5px solid #b8deca; border-radius:10px; padding:10px 14px; }
    .rf-nin-pill-label { font-family:'DM Sans',sans-serif; font-size:12px; color:#6b8a78; margin-bottom:1px; }
    .rf-nin-pill-value { font-family:'DM Sans',sans-serif; font-size:14px; font-weight:700; color:#00572f; letter-spacing:0.06em; font-variant-numeric:tabular-nums; }
    .rf-readonly-field { width:100%; color:#1a3d2b; padding:10px 14px; border:1.5px solid #e0ebe4; border-radius:10px; background:#f3f8f5; font-family:'DM Sans',sans-serif; font-size:14px; box-sizing:border-box; cursor:not-allowed; }
  `;

  const maskNin = (n: string) => `●●●●●●●${n.slice(-4)}`;

  return (
    <>
      <style>{styles}</style>

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
              <div className="rf-card">
                <div className="rf-card-header">
                  <div className="rf-card-icon">
                    <CreditCard className="w-4 h-4" style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <h3 className="rf-card-title">Verified Identity</h3>
                    <p className="rf-card-subtitle">
                      Your NIN has been confirmed for this session
                    </p>
                  </div>
                </div>
                <div className="rf-card-body">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="rf-nin-pill flex-1 min-w-0">
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg,#00572f,#007a44)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <CreditCard
                          style={{
                            width: "14px",
                            height: "14px",
                            color: "#fff",
                          }}
                        />
                      </div>
                      <div>
                        <p className="rf-nin-pill-label">NIN</p>
                        <p className="rf-nin-pill-value">{maskNin(nin)}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onChangeNin}
                      disabled={isPending}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "9px 16px",
                        border: "1.5px solid #d3ded9",
                        borderRadius: "8px",
                        background: isPending ? "#f3f8f5" : "#fff",
                        color: isPending ? "#aabdb4" : "#5c7a69",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: isPending ? "not-allowed" : "pointer",
                        whiteSpace: "nowrap",
                        transition: "border-color 0.15s, color 0.15s",
                      }}
                    >
                      <RefreshCw style={{ width: "13px", height: "13px" }} />
                      Change NIN
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Personal Information ────────────────────────────────────── */}
              <div className="rf-card">
                <div className="rf-card-header">
                  <div className="rf-card-icon">
                    <User className="w-4 h-4" style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <h3 className="rf-card-title">Personal Information</h3>
                    <p className="rf-card-subtitle">
                      Tell us your name and how to reach you
                    </p>
                  </div>
                </div>
                <div className="rf-card-body space-y-4">
                  {/* Name row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="rf-field-label">
                        Surname <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field
                        name="surname"
                        type="text"
                        placeholder="eg: Akpan"
                        className="rf-input"
                      />
                      <ErrorMessage
                        name="surname"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                    <div>
                      <label className="rf-field-label">
                        First Name <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        placeholder="eg: Uduak"
                        className="rf-input"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                    <div>
                      <label className="rf-field-label">
                        Other Name{" "}
                        <span className="rf-optional">(Optional)</span>
                      </label>
                      <Field
                        name="otherName"
                        type="text"
                        placeholder="eg: Tom"
                        className="rf-input"
                      />
                      <ErrorMessage
                        name="otherName"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                  </div>

                  {/* DOB + Gender row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="rf-field-label">
                        Date of Birth
                        <span
                          className="rf-optional"
                          style={{ marginLeft: "6px" }}
                        >
                          (from NIN — cannot be edited)
                        </span>
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={ninData?.dob ?? ""}
                        className="rf-readonly-field"
                      />
                    </div>
                    <div>
                      <label className="rf-field-label">
                        Gender <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field as="select" name="gender" className="rf-input">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                  </div>

                  {/* Phone + Email row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="rf-field-label">
                        Phone Number <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field
                        name="phoneNumber"
                        type="tel"
                        placeholder="08012345678"
                        className="rf-input"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                    <div>
                      <label className="rf-field-label">
                        Email Address{" "}
                        <span className="rf-optional">(Optional)</span>
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        className="rf-input"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                  </div>

                  {/* VIN */}
                  <div>
                    <label className="rf-field-label">
                      Voter Identification Number (VIN){" "}
                      <span style={{ color: "#ef4343" }}>*</span>
                    </label>
                    <Field
                      name="vin"
                      type="text"
                      placeholder="Enter your 19+ character VIN"
                      className="rf-input"
                    />
                    <ErrorMessage
                      name="vin"
                      component="p"
                      className="rf-error"
                    />
                    <p
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "11px",
                        color: "#8aab98",
                        marginTop: "4px",
                      }}
                    >
                      Found on your Permanent Voter's Card (PVC). Must be at
                      least 19 characters.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Location Details ────────────────────────────────────────── */}
              <div className="rf-card">
                <div className="rf-card-header">
                  <div className="rf-card-icon">
                    <MapPin className="w-4 h-4" style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <h3 className="rf-card-title">Where Are You From?</h3>
                    <p className="rf-card-subtitle">
                      Select your ward and village within Ikot Ekpene
                    </p>
                  </div>
                </div>
                <div className="rf-card-body">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="rf-field-label">
                        Ward <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field
                        as="select"
                        name="ward"
                        className="rf-input"
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
                      <ErrorMessage
                        name="ward"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                    <div>
                      <label className="rf-field-label">
                        Village <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field
                        as="select"
                        name="village"
                        disabled={!values.ward}
                        className="rf-input"
                      >
                        <option value="">Select your village</option>
                        {villageOptions.map((v: any) => (
                          <option key={v?.id} value={v?.name}>
                            {v?.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="village"
                        component="p"
                        className="rf-error"
                      />
                      {!values.ward && (
                        <p
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: "12px",
                            color: "#8aab98",
                            marginTop: "4px",
                          }}
                        >
                          Select a ward first
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Education ───────────────────────────────────────────────── */}
              <div className="rf-card">
                <div className="rf-card-header">
                  <div className="rf-card-icon">
                    <GraduationCap
                      className="w-4 h-4"
                      style={{ color: "#fff" }}
                    />
                  </div>
                  <div>
                    <h3 className="rf-card-title">Educational Qualification</h3>
                    <p className="rf-card-subtitle">
                      Have you been to school? Tell us what level you reached
                    </p>
                  </div>
                </div>
                <div className="rf-card-body space-y-4">
                  <div>
                    <label className="rf-field-label">
                      Do you have any educational qualification?{" "}
                      <span style={{ color: "#ef4343" }}>*</span>
                    </label>
                    <div className="flex gap-3">
                      <label className="rf-radio-pill">
                        <Field
                          type="radio"
                          name="hasEducation"
                          value="yes"
                          className="w-4 h-4"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="rf-radio-pill">
                        <Field
                          type="radio"
                          name="hasEducation"
                          value="no"
                          className="w-4 h-4"
                        />
                        <span>No</span>
                      </label>
                    </div>
                    <ErrorMessage
                      name="hasEducation"
                      component="p"
                      className="rf-error"
                    />
                  </div>

                  {values.hasEducation === "yes" && (
                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="rf-field-label">
                          Highest Qualification{" "}
                          <span style={{ color: "#ef4343" }}>*</span>
                        </label>
                        <Field
                          as="select"
                          name="highestQualification"
                          className="rf-input"
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
                        <ErrorMessage
                          name="highestQualification"
                          component="p"
                          className="rf-error"
                        />
                      </div>
                      <div>
                        <label className="rf-field-label">
                          Discipline / Course of Study{" "}
                          <span style={{ color: "#ef4343" }}>*</span>
                        </label>
                        <Field
                          as="select"
                          name="discipline"
                          className="rf-input"
                        >
                          <option value="">Select your discipline</option>
                          {disciplines.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="discipline"
                          component="p"
                          className="rf-error"
                        />
                      </div>

                      {values.discipline === "Other" && (
                        <div>
                          <label className="rf-field-label">
                            Specify Your Discipline{" "}
                            <span style={{ color: "#ef4343" }}>*</span>
                          </label>
                          <Field
                            name="otherDiscipline"
                            type="text"
                            placeholder="Enter your course of study"
                            className="rf-input"
                          />
                          <ErrorMessage
                            name="otherDiscipline"
                            component="p"
                            className="rf-error"
                          />
                        </div>
                      )}
                      <div>
                        <label className="rf-field-label">
                          Upload Certificate{" "}
                          <span className="rf-optional">(Optional)</span>
                        </label>
                        <label className="rf-upload-zone">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            style={{ display: "none" }}
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              setFieldValue("certificate", file);
                            }}
                          />
                          <div style={{ pointerEvents: "none" }}>
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                background:
                                  "linear-gradient(135deg,#00572f,#007a44)",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 8px",
                              }}
                            >
                              <GraduationCap
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  color: "#fff",
                                }}
                              />
                            </div>
                            <p
                              style={{
                                fontFamily: "'DM Sans',sans-serif",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#1a3d2b",
                                margin: "0 0 2px",
                              }}
                            >
                              {values.certificate
                                ? (values.certificate as File).name
                                : "Click to upload your certificate"}
                            </p>
                            <p
                              style={{
                                fontFamily: "'DM Sans',sans-serif",
                                fontSize: "11px",
                                color: "#8aab98",
                                margin: 0,
                              }}
                            >
                              PDF, JPG or PNG — max 5MB
                            </p>
                          </div>
                        </label>
                        <ErrorMessage
                          name="certificate"
                          component="p"
                          className="rf-error"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Skills ──────────────────────────────────────────────────── */}
              <div className="rf-card">
                <div className="rf-card-header">
                  <div className="rf-card-icon">
                    <Wrench className="w-4 h-4" style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <h3 className="rf-card-title">
                      Skill (What skills do you have?)
                    </h3>
                    <p className="rf-card-subtitle">
                      Tell us what you can do and what you'd like to learn
                    </p>
                  </div>
                </div>
                <div className="rf-card-body space-y-4">
                  {/* Current skill */}
                  <div>
                    <label className="rf-field-label">
                      Your Primary Skill{" "}
                      <span style={{ color: "#ef4343" }}>*</span>
                    </label>
                    <Field
                      as="select"
                      name="vocationalSkill"
                      className="rf-input"
                    >
                      <option value="">Select your primary skill</option>
                      {vocationalSkills.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="vocationalSkill"
                      component="p"
                      className="rf-error"
                    />
                  </div>

                  {values.vocationalSkill === "Other" && (
                    <div>
                      <label className="rf-field-label">
                        Specify Your Skill{" "}
                        <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field
                        name="otherSkill"
                        type="text"
                        placeholder="Enter your specific skill"
                        className="rf-input"
                      />
                      <ErrorMessage
                        name="otherSkill"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                  )}

                  {/* Skill acquisition */}
                  <div>
                    <label className="rf-field-label">
                      Skill Acquisition (What skills would you like to learn?){" "}
                      <span className="rf-optional">(Optional)</span>
                    </label>
                    <Field
                      as="select"
                      name="skillAcquisition"
                      className="rf-input"
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
                    <ErrorMessage
                      name="skillAcquisition"
                      component="p"
                      className="rf-error"
                    />
                  </div>

                  {values.skillAcquisition === "Other" && (
                    <div>
                      <label className="rf-field-label">
                        Specify Skill to Learn{" "}
                        <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field
                        name="otherSkillAcquisition"
                        type="text"
                        placeholder="Enter the skill you want to learn"
                        className="rf-input"
                      />
                      <ErrorMessage
                        name="otherSkillAcquisition"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* ── Village Authority Verification ──────────────────────────── */}
              <div className="rf-card">
                <div className="rf-card-header">
                  <div className="rf-card-icon">
                    <Shield className="w-4 h-4" style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <h3 className="rf-card-title">
                      Village Authority Verification
                    </h3>
                    <p className="rf-card-subtitle">
                      We need to confirm you are truly from Ikot Ekpene
                    </p>
                  </div>
                </div>
                <div className="rf-card-body space-y-4">
                  <p
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      fontSize: "13px",
                      color: "#5c7166",
                      margin: "0 0 4px",
                    }}
                  >
                    Provide the contact details of your village head for
                    verification purposes.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="rf-field-label">
                        Name of Village Head{" "}
                        <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field
                        name="villageHeadName"
                        type="text"
                        placeholder="Enter village head's name"
                        className="rf-input"
                      />
                      <ErrorMessage
                        name="villageHeadName"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                    <div>
                      <label className="rf-field-label">
                        Phone Number of Village Head{" "}
                        <span style={{ color: "#ef4343" }}>*</span>
                      </label>
                      <Field
                        name="villageHeadPhone"
                        type="tel"
                        placeholder="08012345678"
                        className="rf-input"
                      />
                      <ErrorMessage
                        name="villageHeadPhone"
                        component="p"
                        className="rf-error"
                      />
                    </div>
                  </div>

                  {/* Certificate of Origin upload */}
                  <div>
                    <label className="rf-field-label">
                      Upload Certificate of Origin{" "}
                      <span style={{ color: "#ef4343" }}>*</span>
                    </label>
                    <label className="rf-upload-zone">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setFieldValue("certificateOfOrigin", file);
                        }}
                      />
                      <div style={{ pointerEvents: "none" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            background:
                              "linear-gradient(135deg,#00572f,#007a44)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 8px",
                          }}
                        >
                          <Shield
                            style={{
                              width: "18px",
                              height: "18px",
                              color: "#fff",
                            }}
                          />
                        </div>
                        <p
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#1a3d2b",
                            margin: "0 0 2px",
                          }}
                        >
                          {values.certificateOfOrigin
                            ? (values.certificateOfOrigin as File).name
                            : "Click to upload your Certificate of Origin"}
                        </p>
                        <p
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: "11px",
                            color: "#8aab98",
                            margin: 0,
                          }}
                        >
                          PDF, JPG or PNG — max 5MB
                        </p>
                      </div>
                    </label>
                    <ErrorMessage
                      name="certificateOfOrigin"
                      component="p"
                      className="rf-error"
                    />
                  </div>
                </div>
              </div>

              {/* ── Submit ──────────────────────────────────────────────────── */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isPending}
                  className="bg-[#ec7913] hover:bg-[#ec7913]/90 text-[#ffffff] hover:cursor-pointer px-8 py-3 text-base font-semibold"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Submitting...
                    </>
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
