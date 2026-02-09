import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  User,
  MapPin,
  GraduationCap,
  Wrench,
  Shield,
  Loader2,
} from "lucide-react";
import { Button } from "./Button";
import {
  wards,
  vocationalSkills,
  educationalQualifications,
} from "@/data/locationData";

interface RegistrationFormProps {
  onSuccess: () => void;
}

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,11}$/, "Enter a valid phone number (10-11 digits)")
    .required("Phone number is required"),
  email: Yup.string().email("Enter a valid email address"),
  ward: Yup.string().required("Please select your ward"),
  village: Yup.string().required("Please select your village"),
  hasEducation: Yup.string().required("Please indicate your education status"),
  highestQualification: Yup.string().when("hasEducation", {
    is: "yes",
    then: (schema) =>
      schema.required("Please select your highest qualification"),
  }),
  certificate: Yup.mixed().nullable(),
  vocationalSkill: Yup.string().required("Please select a vocational skill"),
  otherSkill: Yup.string().when("vocationalSkill", {
    is: "Other",
    then: (schema) => schema.required("Please specify your skill"),
  }),
  villageHeadName: Yup.string().required("Village head name is required"),
  villageHeadPhone: Yup.string()
    .matches(/^[0-9]{10,11}$/, "Enter a valid phone number (10-11 digits)")
    .required("Village head phone number is required"),
});

const initialValues = {
  fullName: "",
  phoneNumber: "",
  email: "",
  ward: "",
  village: "",
  hasEducation: "",
  highestQualification: "",
  certificate: null as File | null,
  vocationalSkill: "",
  otherSkill: "",
  villageHeadName: "",
  villageHeadPhone: "",
};

export const RegistrationForm = ({ onSuccess }: RegistrationFormProps) => {
  const handleSubmit = async (values: typeof initialValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", values);
    onSuccess();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, errors, touched }) => {
        const selectedWard = wards.find((w) => w.id === values.ward);
        const villageOptions = selectedWard ? selectedWard.villages : [];

        return (
          <Form className="space-y-6">
            {/* Personal Information */}
            <div className="bg-[#ffffff] shadow-lg rounded-lg border p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#ec7913]" />
                <h3 className="text-lg text-[#00572f] font-semibold">
                  Personal Information
                </h3>
              </div>

              <div>
                <label className="text-[#112219] block text-sm font-medium mb-1.5">
                  Full Name <span className="text-[#ef4343]">*</span>
                </label>
                <Field
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full text-[#112219] px-3 py-2 border border-[#d3ded9] rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
                />
                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="text-sm text-[#ef4343] mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#112219] block text-sm font-medium mb-1.5">
                    Phone Number <span className="text-[#ef4343]">*</span>
                  </label>
                  <Field
                    name="phoneNumber"
                    type="tel"
                    placeholder="08012345678"
                    className="w-full text-[#112219] border-[#d3ded9] border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="p"
                    className="text-sm text-[#ef4343] mt-1"
                  />
                </div>

                <div>
                  <label className="text-[#112219] block text-sm font-medium mb-1.5">
                    Email Address{" "}
                    <span className="text-[#5c7166] text-xs">(Optional)</span>
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    className="w-full text-[#112219] border-[#d3ded9] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-[#ef4343] mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-[#FFFFFF] shadow-lg rounded-lg border p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#ec7913]" />
                <h3 className="text-lg text-[#00572f] font-semibold">
                  Location Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#112219] block text-sm font-medium mb-1.5">
                    Ward <span className="text-[#ef4343]">*</span>
                  </label>
                  <Field
                    as="select"
                    name="ward"
                    className="w-full text-[#112219] border-[#d3ded9] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue("ward", e.target.value);
                      setFieldValue("village", "");
                    }}
                  >
                    <option value="">Select your ward</option>
                    {wards.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="ward"
                    component="p"
                    className="text-sm text-[#ef4343] mt-1"
                  />
                </div>

                <div>
                  <label className="text-[#112219] block text-sm font-medium mb-1.5">
                    Village <span className="text-[#ef4343]">*</span>
                  </label>
                  <Field
                    as="select"
                    name="village"
                    disabled={!values.ward}
                    className="w-full text-[#112219] border-[#d3ded9] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Select your village</option>
                    {villageOptions.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="village"
                    component="p"
                    className="text-sm text-[#ef4343] mt-1"
                  />
                  {!values.ward && (
                    <p className="text-xs text-[#5c7166] mt-1">
                      Select a ward first
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-[#FFFFFF] shadow-lg rounded-lg border p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-[#ec7913]" />
                <h3 className="text-lg text-[#00572f] font-semibold">
                  Educational Qualification
                </h3>
              </div>

              <div>
                <label className="text-[#112219] block text-sm font-medium mb-2">
                  Do you have any educational qualification?{" "}
                  <span className="text-[#ef4343]">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="text-[#112219] flex items-center gap-2 cursor-pointer">
                    <Field
                      type="radio"
                      name="hasEducation"
                      value="yes"
                      className="w-4 h-4 border-[#d3ded9]"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="text-[#112219] flex items-center gap-2 cursor-pointer">
                    <Field
                      type="radio"
                      name="hasEducation"
                      value="no"
                      className="w-4 h-4 border-[#d3ded9]"
                    />
                    <span>No</span>
                  </label>
                </div>
                <ErrorMessage
                  name="hasEducation"
                  component="p"
                  className="text-sm text-[#ef4343] mt-1"
                />
              </div>

              {values.hasEducation === "yes" && (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="text-[#112219] block text-sm font-medium mb-1.5">
                      Highest Qualification{" "}
                      <span className="text-[#ef4343]">*</span>
                    </label>
                    <Field
                      as="select"
                      name="highestQualification"
                      className="w-full text-[#112219] border-[#d3ded9] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
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
                      className="text-sm text-[#ef4343] mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-[#112219] block text-sm font-medium mb-1.5">
                      Upload Certificate{" "}
                      <span className="text-[#5c7166] text-xs">(Optional)</span>
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setFieldValue("certificate", file);
                      }}
                      className="w-full text-[#112219] border-[#d3ded9] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
                    />
                    <p className="text-xs text-[#5c7166] mt-1">
                      Upload your highest qualification certificate
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Vocational Skills */}
            <div className="bg-[#FFFFFF] shadow-lg rounded-lg border p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-[#ec7913]" />
                <h3 className="text-lg text-[#00572f] font-semibold">
                  Vocational / Skill Acquisition
                </h3>
              </div>

              <div>
                <label className="text-[#112219] block text-sm font-medium mb-1.5">
                  Vocational Training / Skill{" "}
                  <span className="text-[#ef4343]">*</span>
                </label>
                <Field
                  as="select"
                  name="vocationalSkill"
                  className="w-full text-[#112219] border-[#d3ded9] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
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
                  className="text-sm text-[#ef4343] mt-1"
                />
              </div>

              {values.vocationalSkill === "Other" && (
                <div>
                  <label className="text-[#112219] block text-sm font-medium mb-1.5">
                    Specify Your Skill <span className="text-[#ef4343]">*</span>
                  </label>
                  <Field
                    name="otherSkill"
                    type="text"
                    placeholder="Enter your specific skill"
                    className="w-full text-[#112219] border-[#d3ded9] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
                  />
                  <ErrorMessage
                    name="otherSkill"
                    component="p"
                    className="text-sm text-[#ef4343] mt-1"
                  />
                </div>
              )}
            </div>

            {/* Village Authority Verification */}
            <div className="bg-[#FFFFFF] shadow-lg rounded-lg border p-6 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-[#ec7913]" />
                <h3 className="text-lg text-[#00572f] font-semibold">
                  Village Authority Verification
                </h3>
              </div>

              <p className="text-sm text-[#5c7166] mb-4">
                Provide the contact details of your village head for
                verification purposes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#112219] block text-sm font-medium mb-1.5">
                    Name of Village Head{" "}
                    <span className="text-[#ef4343]">*</span>
                  </label>
                  <Field
                    name="villageHeadName"
                    type="text"
                    placeholder="Enter village head's name"
                    className="w-full text-[#112219] border-[#d3ded9] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
                  />
                  <ErrorMessage
                    name="villageHeadName"
                    component="p"
                    className="text-sm text-[#ef4343] mt-1"
                  />
                </div>

                <div>
                  <label className="text-[#112219] block text-sm font-medium mb-1.5">
                    Phone Number of Village Head{" "}
                    <span className="text-[#ef4343]">*</span>
                  </label>
                  <Field
                    name="villageHeadPhone"
                    type="tel"
                    placeholder="08012345678"
                    className="w-full text-[#112219] border-[#d3ded9] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00572f]"
                  />
                  <ErrorMessage
                    name="villageHeadPhone"
                    component="p"
                    className="text-sm text-[#ef4343] mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-[#ec7913] hover:bg-[#ec7913]/90 text-[#ffffff] hover:cursor-pointer px-8 py-3 text-base font-semibold"
              >
                {isSubmitting ? (
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
  );
};
