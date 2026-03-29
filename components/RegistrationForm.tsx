/* eslint-disable @typescript-eslint/no-explicit-any */
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
  vocationalSkills,
  educationalQualifications,
} from "@/data/locationData";
import {
  useGetAllDatabaseWards,
  useSubmitApplications,
} from "@/services/tanstack";
import { useAlert } from "next-alert";

const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = {
  "application/pdf": ".pdf",
  "image/jpeg": ".jpg",
  "image/jpg": ".jpg",
  "image/png": ".png",
};

const validationSchema = Yup.object({
  surname: Yup.string().required("Surname is required"),
  firstName: Yup.string().required("First name is required"),
  otherName: Yup.string(),
  phoneNumber: Yup.string()
    .matches(
      /^0[0-9]{10}$/,
      "Enter a valid 11-digit phone number starting with 0 (e.g., 08062898015)",
    )
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
  vocationalSkill: Yup.string().required("Please select a vocational skill"),
  otherSkill: Yup.string().when("vocationalSkill", {
    is: "Other",
    then: (schema) => schema.required("Please specify your skill"),
  }),
  villageHeadName: Yup.string().required("Village head name is required"),
  villageHeadPhone: Yup.string()
    .matches(
      /^0[0-9]{10}$/,
      "Enter a valid 11-digit phone number starting with 0 (e.g., 08062898015)",
    )
    .required("Village head phone number is required"),
});

const initialValues = {
  surname: "",
  firstName: "",
  otherName: "",
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

const isFileSizeValid = (file: any) => {
  return file.size <= MAX_FILE_SIZE_BYTES;
};

const isFileTypeValid = (file: any) => {
  return Object.keys(ALLOWED_FILE_TYPES).includes(file.type);
};

export const RegistrationForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { data: allWards } = useGetAllDatabaseWards();
  const { mutate: submitApplication, isPending } = useSubmitApplications();
  const { addAlert } = useAlert();
  const wards = allWards?.data || [];

  const handleSubmit = (values: typeof initialValues) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "certificate") {
        if (value instanceof File) formData.append("certificate", value);
      } else if (value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    submitApplication(formData, {
      onSuccess: (data: any) => {
        addAlert("Success", data?.message, "success");
        onSuccess();
      },
      onError: (error: any) => {
        addAlert(
          "Error",
          `Error submitting application: ${error?.message ?? "Unknown error"}`,
          "error",
        );
      },
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap');

        .rf-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e4ede8;
          box-shadow: 0 2px 16px rgba(0,60,30,0.06);
          overflow: hidden;
        }

        .rf-card-header {
          background: linear-gradient(135deg, #f5f9f6 0%, #edf4ef 100%);
          border-bottom: 1px solid #e0ebe4;
          padding: 15px 22px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rf-card-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00572f, #007a44);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,87,47,0.25);
        }

        .rf-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #00572f;
          margin: 0;
          line-height: 1.2;
        }

        .rf-card-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #6b8a78;
          margin: 2px 0 0;
        }

        .rf-card-body {
          padding: 20px 22px 24px;
        }

        .rf-field-label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #1a3d2b;
          margin-bottom: 6px;
        }

        .rf-input {
          width: 100%;
          color: #112219;
          padding: 10px 14px;
          border: 1.5px solid #d3ded9;
          border-radius: 10px;
          background: #fafcfb;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          box-sizing: border-box;
        }
        .rf-input:focus {
          border-color: #00572f;
          box-shadow: 0 0 0 3px rgba(0,87,47,0.1);
        }
        .rf-input::placeholder { color: #aabdb4; }
        .rf-input:disabled { opacity: 0.5; cursor: not-allowed; }

        .rf-error {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          color: #ef4343;
          margin-top: 4px;
        }

        .rf-optional {
          color: #8aab98;
          font-weight: 400;
          font-size: 11px;
          margin-left: 4px;
        }

        .rf-radio-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border: 1.5px solid #d3ded9;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #1a3d2b;
          background: #fafcfb;
          transition: border-color 0.15s, background 0.15s;
          user-select: none;
        }
        .rf-radio-pill:has(input:checked) {
          border-color: #00572f;
          background: #edf5f0;
          color: #00572f;
        }
        .rf-radio-pill:hover { border-color: #7db898; }

        .rf-upload-zone {
          border: 2px dashed #c0d9ca;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          background: #f8fbf9;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        .rf-upload-zone:hover {
          border-color: #00572f;
          background: #edf5f0;
        }
      `}</style>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => {
          const selectedWard = allWards?.data.find(
            (w: any) => w.id === values.ward,
          );
          const villageOptions = selectedWard ? selectedWard.villages : [];

          return (
            <Form className="space-y-5">
              {/* Personal Information */}
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
                  {/* Name fields */}
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

                  {/* Contact fields */}
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
                </div>
              </div>

              {/* Location Details */}
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

              {/* Education */}
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

              {/* Vocational Skills */}
              <div className="rf-card">
                <div className="rf-card-header">
                  <div className="rf-card-icon">
                    <Wrench className="w-4 h-4" style={{ color: "#fff" }} />
                  </div>
                  <div>
                    <h3 className="rf-card-title">
                      Vocational / Skill Acquisition
                    </h3>
                    <p className="rf-card-subtitle">
                      What kind of work can you do? Choose the one that fits
                      best
                    </p>
                  </div>
                </div>
                <div className="rf-card-body space-y-4">
                  <div>
                    <label className="rf-field-label">
                      Vocational Training / Skill{" "}
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
                </div>
              </div>

              {/* Village Authority Verification */}
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
                </div>
              </div>

              {/* Submit Button */}
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
