import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { ChevronLeft, ChevronRight, Loader2, Save, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";
import { DashboardShell, PageLoader } from "@/shared/components";
import { Card, CardContent, Button, toast } from "@/shared/ui";
import { useAuth } from "@/features/auth/context/AuthContext";
import {
  getWardsAndVillages,
  submitApplication,
  getRegistrationDraft,
  saveRegistrationDraft,
  deleteRegistrationDraft,
} from "../api";
import { StepProgress } from "../components/StepProgress";
import { PersonalInfoStep } from "../components/steps/PersonalInfoStep";
import { LocationStep } from "../components/steps/LocationStep";
import { EducationSkillsStep } from "../components/steps/EducationSkillsStep";
import { DocumentsStep } from "../components/steps/DocumentsStep";
import { SuccessState } from "../components/SuccessState";
import { SubmittedApplicationView } from "../components/SubmittedApplicationView";
import { MAX_FILE_SIZE_BYTES, MAX_FILE_SIZE_MB, ALLOWED_FILE_TYPES } from "../types";
import type { RegistrationFormValues, SerializableFormValues } from "../types";

const STEP_LABELS = ["Personal", "Location", "Education & Skills", "Documents"];

const STEP_FIELDS: (keyof RegistrationFormValues)[][] = [
  ["surname", "firstName", "otherName", "gender", "vin"],
  ["ward", "village", "villageHeadName", "villageHeadPhone"],
  [
    "hasEducation",
    "highestQualification",
    "discipline",
    "otherDiscipline",
    "certificate",
    "vocationalSkill",
    "otherSkill",
    "skillAcquisition",
    "otherSkillAcquisition",
  ],
  ["certificateOfOrigin"],
];

const DEFAULT_VALUES: RegistrationFormValues = {
  surname: "",
  firstName: "",
  otherName: "",
  gender: "",
  vin: "",
  ward: "",
  village: "",
  hasEducation: "",
  highestQualification: "",
  discipline: "",
  otherDiscipline: "",
  certificate: null,
  vocationalSkill: "",
  otherSkill: "",
  skillAcquisition: "",
  otherSkillAcquisition: "",
  villageHeadName: "",
  villageHeadPhone: "",
  certificateOfOrigin: null,
};

const schema = z
  .object({
    surname: z.string().min(2, "Surname must be at least 2 characters").max(100, "Surname must not exceed 100 characters"),
    firstName: z.string().min(2, "First name must be at least 2 characters").max(100, "First name must not exceed 100 characters"),
    otherName: z.string().max(100, "Other name must not exceed 100 characters").optional().default(""),
    gender: z.enum(["male", "female"], { errorMap: () => ({ message: "Please select your gender" }) }),
    vin: z.string().min(19, "VIN must be at least 19 characters"),
    ward: z.string().min(1, "Please select your ward"),
    village: z.string().min(1, "Please select your village"),
    hasEducation: z.enum(["yes", "no"], {
      errorMap: () => ({ message: "Please indicate your education status" }),
    }),
    highestQualification: z.string().optional().default(""),
    discipline: z.string().optional().default(""),
    otherDiscipline: z.string().max(200, "Keep this under 200 characters").optional().default(""),
    certificate: z.any().nullable(),
    vocationalSkill: z.string().min(1, "Please select a skill"),
    otherSkill: z.string().max(200, "Keep this under 200 characters").optional().default(""),
    skillAcquisition: z.string().optional().default(""),
    otherSkillAcquisition: z.string().max(200, "Keep this under 200 characters").optional().default(""),
    villageHeadName: z.string().min(2, "Village head name must be at least 2 characters").max(100, "Village head name must not exceed 100 characters"),
    villageHeadPhone: z
      .string()
      .regex(/^0[0-9]{10}$/, "Enter a valid 11-digit phone number starting with 0"),
    certificateOfOrigin: z.any().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.hasEducation === "yes") {
      if (!data.highestQualification) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["highestQualification"], message: "Please select your highest qualification" });
      }
      if (!data.discipline) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["discipline"], message: "Please select your discipline" });
      }
    }
    if (data.discipline === "Other" && !data.otherDiscipline) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["otherDiscipline"], message: "Please specify your discipline" });
    }
    if (data.vocationalSkill === "Other" && !data.otherSkill) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["otherSkill"], message: "Please specify your skill" });
    }
    if (data.skillAcquisition === "Other" && !data.otherSkillAcquisition) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherSkillAcquisition"],
        message: "Please specify the skill you want to learn",
      });
    }
    const certificate = data.certificate as File | null;
    if (certificate) {
      if (certificate.size > MAX_FILE_SIZE_BYTES) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["certificate"], message: `File size must not be more than ${MAX_FILE_SIZE_MB}MB` });
      }
      if (!ALLOWED_FILE_TYPES.includes(certificate.type)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["certificate"], message: "Only PDF, JPG, JPEG and PNG files are allowed" });
      }
    }
    const certificateOfOrigin = data.certificateOfOrigin as File | null;
    if (!certificateOfOrigin) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["certificateOfOrigin"], message: "Please upload your Certificate of Origin" });
    } else {
      if (certificateOfOrigin.size > MAX_FILE_SIZE_BYTES) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["certificateOfOrigin"], message: `File size must not be more than ${MAX_FILE_SIZE_MB}MB` });
      }
      if (!ALLOWED_FILE_TYPES.includes(certificateOfOrigin.type)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["certificateOfOrigin"], message: "Only PDF, JPG, JPEG and PNG files are allowed" });
      }
    }
  });

const Wrap = styled.div`
  max-width: 42rem;
  margin: 0 auto;
`;

const StyledCard = styled(Card)`
  margin-bottom: 1.5rem;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.75rem;
`;

const SaveStatus = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionsRight = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const DRAFT_SAVE_DEBOUNCE_MS = 1500;

const stripFiles = (values: RegistrationFormValues): Partial<SerializableFormValues> => {
  const { certificate: _certificate, certificateOfOrigin: _certificateOfOrigin, ...rest } = values;
  return rest;
};

export const EmploymentRegistrationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const accessVerified = Boolean((location.state as { accessVerified?: boolean } | null)?.accessVerified);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wardsQuery = useQuery({ queryKey: ["wards"], queryFn: getWardsAndVillages });
  const wards = wardsQuery.data ?? [];

  const draftQuery = useQuery({
    queryKey: ["registration-draft", user?.id],
    queryFn: getRegistrationDraft,
    enabled: Boolean(user),
  });

  useEffect(() => {
    if (draftQuery.isError) {
      toast.error("Couldn't check for saved progress — starting a fresh form.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftQuery.isError]);

  // The NIN provider's gender format isn't normalized server-side, so match
  // loosely ("f"/"female"/"F"...) rather than assuming a single-letter code.
  const genderHint = user?.gender?.toLowerCase() ?? "";
  const prefillGender = genderHint.startsWith("f") ? "female" : genderHint.startsWith("m") ? "male" : "";

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      ...DEFAULT_VALUES,
      surname: user?.surname ?? "",
      firstName: user?.firstName ?? "",
      otherName: user?.otherName ?? "",
      gender: prefillGender,
    },
  });

  // Hydrate the form from a saved draft (if any) once, after the draft request resolves.
  useEffect(() => {
    if (hasHydrated || draftQuery.isLoading || !draftQuery.isFetched) return;
    const draft = draftQuery.data;
    if (draft) {
      form.reset({ ...form.getValues(), ...draft.values });
      setStep(Math.min(draft.step ?? 0, STEP_LABELS.length - 1));
      toast.info("Resumed your saved registration progress.");
    }
    setHasHydrated(true);
  }, [draftQuery.isLoading, draftQuery.isFetched, draftQuery.data, hasHydrated, form]);

  const saveDraftMutation = useMutation({
    mutationFn: saveRegistrationDraft,
    onSuccess: () => setSavedAt(new Date()),
  });

  const persistDraft = (nextStep: number) => {
    if (!hasHydrated) return;
    saveDraftMutation.mutate({ values: stripFiles(form.getValues()), step: nextStep });
  };

  // Debounced autosave on every field change.
  useEffect(() => {
    if (!hasHydrated) return;
    const subscription = form.watch(() => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => persistDraft(step), DRAFT_SAVE_DEBOUNCE_MS);
    });
    return () => {
      subscription.unsubscribe();
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, step]);

  const submitMutation = useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      deleteRegistrationDraft().catch(() => undefined);
      setDone(true);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Submission failed"),
  });

  if (!user) return null;

  // Once submitted, the application is final — show the read-only view
  // directly, no need to re-verify NIN + access code just to look at it.
  if (user.applicationStatus === "submitted") {
    return (
      <DashboardShell title="Employment Registration">
        <SubmittedApplicationView />
      </DashboardShell>
    );
  }

  // Every visit to the wizard must come freshly through the NIN + access
  // code gate — this state flag doesn't survive a refresh or direct nav,
  // which is intentional (re-verification is required each time).
  if (!accessVerified) {
    return <Navigate to="/apply" replace />;
  }

  if (done) {
    return (
      <DashboardShell title="Employment Registration">
        <SuccessState />
      </DashboardShell>
    );
  }

  const goNext = async () => {
    const valid = await form.trigger(STEP_FIELDS[step]);
    if (valid) {
      const nextStep = Math.min(step + 1, STEP_LABELS.length - 1);
      setStep(nextStep);
      persistDraft(nextStep);
    }
  };

  const goBack = () => {
    const nextStep = Math.max(step - 1, 0);
    setStep(nextStep);
    persistDraft(nextStep);
  };

  const handleSaveAndExit = () => {
    saveDraftMutation.mutate(
      { values: stripFiles(form.getValues()), step },
      {
        onSuccess: () => {
          toast.success("Progress saved. Continue anytime from your dashboard.");
          navigate("/dashboard");
        },
      },
    );
  };

  const onSubmit = (values: RegistrationFormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "certificate" || key === "certificateOfOrigin") {
        if (value instanceof File) formData.append(key, value);
      } else if (value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });
    submitMutation.mutate(formData);
  };

  if (draftQuery.isLoading) {
    return (
      <DashboardShell title="Employment Registration">
        <PageLoader title="Checking for saved progress..." />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="Employment Registration">
      <Wrap>
        <TopRow>
          {saveDraftMutation.isPending ? (
            <SaveStatus>
              <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> Saving...
            </SaveStatus>
          ) : (
            savedAt && (
              <SaveStatus>
                <CheckCircle2 size={13} /> Saved {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </SaveStatus>
            )
          )}
        </TopRow>

        <StepProgress steps={STEP_LABELS} current={step} />

        <form
          onSubmit={(e) => {
            if (step !== STEP_LABELS.length - 1) {
              e.preventDefault();
              return;
            }
            form.handleSubmit(onSubmit)(e);
          }}
        >
          <StyledCard>
            {step === 0 && <PersonalInfoStep form={form} user={user} />}
            {step === 1 && (
              <>
                {wardsQuery.isLoading && <PageLoader title="Loading wards..." />}
                {wardsQuery.isError && (
                  <CardContent>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", padding: "1.5rem 0" }}>
                      <AlertTriangle size={32} color="#EF4444" />
                      <p style={{ textAlign: "center", color: "#677E76", fontSize: "0.875rem", margin: 0 }}>
                        {wardsQuery.error instanceof Error
                          ? wardsQuery.error.message
                          : "Couldn't load the list of wards. Please try again."}
                      </p>
                      <Button type="button" onClick={() => wardsQuery.refetch()}>
                        <RefreshCw size={15} /> Try Again
                      </Button>
                    </div>
                  </CardContent>
                )}
                {wardsQuery.isSuccess && <LocationStep form={form} wards={wards} />}
              </>
            )}
            {step === 2 && <EducationSkillsStep form={form} />}
            {step === 3 && <DocumentsStep form={form} />}
          </StyledCard>

          <Actions>
            <Button type="button" variant="outline" onClick={goBack} disabled={step === 0}>
              <ChevronLeft size={16} /> Back
            </Button>
            <ActionsRight>
              <Button type="button" variant="outline" onClick={handleSaveAndExit} disabled={saveDraftMutation.isPending}>
                <Save size={16} /> Save &amp; Exit
              </Button>
              {step < STEP_LABELS.length - 1 ? (
                <Button type="button" onClick={goNext}>
                  Next <ChevronRight size={16} />
                </Button>
              ) : (
                <Button type="submit" disabled={submitMutation.isPending}>
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </Button>
              )}
            </ActionsRight>
          </Actions>
        </form>
      </Wrap>
    </DashboardShell>
  );
};
