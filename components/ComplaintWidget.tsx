/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { MessageCircleMore, X, Loader2 } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/Button";
import { StatusModal } from "./StatusModal";
import { useSubmitComplaints } from "@/services/complaints/tanstack";

const inputClass =
  "w-full text-[#112219] placeholder:text-[#8fa59a] px-4 py-3 border-[1.5px] border-[#d3ded9] rounded-xl bg-[#fafcfb] font-['DM_Sans'] text-sm outline-none focus:border-[#00572f] focus:ring-4 focus:ring-[#00572f]/10 transition-all";

const textareaClass =
  "w-full text-[#112219] placeholder:text-[#8fa59a] px-4 py-3 border-[1.5px] border-[#d3ded9] rounded-xl bg-[#fafcfb] font-['DM_Sans'] text-sm outline-none focus:border-[#00572f] focus:ring-4 focus:ring-[#00572f]/10 transition-all resize-none";

const labelClass =
  "block font-['DM_Sans'] text-sm font-semibold text-[#1a3d2b] mb-1.5";

const errorClass = "font-['DM_Sans'] text-xs text-[#ef4343] mt-1";

const validationSchema = Yup.object({
  nin: Yup.string()
    .required("NIN is required")
    .matches(/^\d{11}$/, "NIN must be exactly 11 digits"),

  fullName: Yup.string()
    .required("Full name is required")
    .test(
      "full-name",
      "Please enter at least first name and surname",
      (value) => {
        if (!value) return false;

        const names = value
          .trim()
          .split(" ")
          .filter((item) => item.trim().length > 0);

        return names.length >= 2;
      },
    ),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^0[0-9]{10}$/,
      "Enter a valid 11-digit phone number starting with 0",
    ),

  errorEncountered: Yup.string(),

  description: Yup.string()
    .required("Full description is required")
    .min(10, "Description must be at least 10 characters"),
});

export const ComplaintWidget = () => {
  const [open, setOpen] = useState(false);
  const [statusModal, setStatusModal] = useState<{
    open: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const { mutateAsync: submitComplaints, isPending: isSubmittingComplaint } =
    useSubmitComplaints();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const initialValues = {
    nin: "",
    fullName: "",
    phoneNumber: "",
    errorEncountered: "",
    description: "",
  };

  const handleCloseStatusModal = () => {
    setStatusModal(() => ({
      open: false,
      title: "",
      message: "",
      type: "success",
    }));
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm, setSubmitting }: any,
  ) => {
    try {
      const payload = new FormData();
      payload.append("nin", values.nin.trim());
      payload.append("fullName", values.fullName.trim());
      payload.append("phoneNumber", values.phoneNumber.trim());
      payload.append("errorEncountered", values.errorEncountered.trim());
      payload.append("description", values.description.trim());
      payload.append("currentPage", window.location.href);
      payload.append("submittedAt", new Date().toISOString());

      submitComplaints(payload, {
        onSuccess: () => {
          setStatusModal(() => ({
            open: true,
            title: "Success",
            message:
              "Complaint submitted successfully. We will get back to you soon within 48 hours.",
            type: "success",
          }));
          resetForm();
          setOpen(false);
        },
        onError: (error) => {
          setStatusModal(() => ({
            open: true,
            title: "Error",
            message:
              error.message ||
              "An error occurred while submitting your complaint. Please try again.",
            type: "error",
          }));
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-center">
        <button
          onClick={() => setOpen(true)}
          className="group flex h-15 w-15 cursor-pointer items-center justify-center rounded-full bg-[#00572f]/65 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-[#00572f] hover:shadow-2xl"
          aria-label="Open complaint form"
        >
          <MessageCircleMore className="h-7 w-7" />
        </button>

        <span className="mt-2 text-xs font-medium text-[#00572f]/65">
          Complain?
        </span>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-linear-to-r from-[#00572f] to-[#007a44] px-6 py-5">
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                aria-label="Close modal"
                disabled={isSubmittingComplaint}
              >
                <X className="h-4 w-4" />
              </button>

              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/70">
                Complaint & Support
              </p>

              <h2 className="text-2xl font-bold text-white">Report an Issue</h2>

              <p className="mt-1 text-sm text-white/80">
                Kindly provide the details below so we can assist you quickly.
                Please if it is payment related, please include the payment
                reference code to help us track it. Thank you.
              </p>
            </div>

            <div className="max-h-[80vh] overflow-y-auto px-6 py-6">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid, dirty }) => (
                  <Form className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>
                          NIN <span className="text-[#ef4343]">*</span>
                        </label>
                        <Field
                          name="nin"
                          type="text"
                          placeholder="Enter your 11-digit NIN"
                          className={inputClass}
                        />
                        <ErrorMessage
                          name="nin"
                          component="p"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Full Name <span className="text-[#ef4343]">*</span>
                        </label>
                        <Field
                          name="fullName"
                          type="text"
                          placeholder="Enter your full name"
                          className={inputClass}
                        />
                        <ErrorMessage
                          name="fullName"
                          component="p"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Phone Number <span className="text-[#ef4343]">*</span>
                        </label>
                        <Field
                          name="phoneNumber"
                          type="tel"
                          placeholder="08012345678"
                          className={inputClass}
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="p"
                          className={errorClass}
                        />
                      </div>

                      <div>
                        <label className={labelClass}>
                          Error Encountered
                          <span className="ml-1 text-[11px] font-normal text-[#8aab98]">
                            (Optional)
                          </span>
                        </label>
                        <Field
                          name="errorEncountered"
                          type="text"
                          placeholder="E.g. Payment failed"
                          className={inputClass}
                        />
                        <ErrorMessage
                          name="errorEncountered"
                          component="p"
                          className={errorClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Full Description{" "}
                        <span className="text-[#ef4343]">*</span>
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        rows={5}
                        placeholder="Please describe the issue you encountered in detail..."
                        className={textareaClass}
                      />
                      <ErrorMessage
                        name="description"
                        component="p"
                        className={errorClass}
                      />
                    </div>

                    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="rounded-xl"
                        disabled={isSubmitting || isSubmittingComplaint}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        disabled={
                          !dirty ||
                          !isValid ||
                          isSubmitting ||
                          isSubmittingComplaint
                        }
                        className="rounded-xl bg-[#ec7913] hover:bg-[#ec7913]/90"
                      >
                        {isSubmitting || isSubmittingComplaint ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          "Submit Complaint"
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}

      <StatusModal
        open={statusModal.open}
        onClose={handleCloseStatusModal}
        title={statusModal.title}
        message={statusModal.message}
        type={statusModal.type}
        clickOutsideToClose={false}
      />
    </>
  );
};
