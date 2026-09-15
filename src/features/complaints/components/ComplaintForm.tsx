import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { WidgetContainer } from "./WidgetContainer";
import { Input, Textarea, Label, Button } from "@/shared/ui";
import { submitComplaint } from "../api";

const schema = z.object({
  nin: z.string().regex(/^\d{11}$/, "NIN must be exactly 11 digits"),
  fullName: z
    .string()
    .min(5, "Full name must be at least 5 characters")
    .max(150, "Full name must not exceed 150 characters")
    .refine(
      (v) => v.trim().split(/\s+/).filter(Boolean).length >= 2,
      "Please enter at least first name and surname",
    ),
  phoneNumber: z
    .string()
    .regex(
      /^0[0-9]{10}$/,
      "Enter a valid 11-digit phone number starting with 0",
    ),
  errorEncountered: z.string().max(255, "Keep this under 255 characters").optional().default(""),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must not exceed 5000 characters"),
});

type FormValues = z.infer<typeof schema>;

const Body = styled.div`
  padding: 1rem;
`;

const BackLink = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 1rem;
`;

const Field = styled.div`
  margin-bottom: 1rem;
`;

const ErrorText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  margin: 0.3rem 0 0;
`;

interface Props {
  onClose: () => void;
  onBack: () => void;
  onMinimize: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

export const ComplaintForm = ({
  onClose,
  onBack,
  onMinimize,
  onSuccess,
  onError,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: submitComplaint,
    onSuccess: () => {
      onSuccess();
      reset();
      onClose();
    },
    onError: (error) =>
      onError(
        error instanceof Error ? error.message : "Failed to submit complaint",
      ),
  });

  const onSubmit = (values: FormValues) => {
    const payload = new FormData();
    payload.append("nin", values.nin.trim());
    payload.append("fullName", values.fullName.trim());
    payload.append("phoneNumber", values.phoneNumber.trim());
    payload.append("errorEncountered", (values.errorEncountered ?? "").trim());
    payload.append("description", values.description.trim());
    payload.append("currentPage", window.location.href);
    payload.append("submittedAt", new Date().toISOString());
    mutation.mutate(payload);
  };

  return (
    <WidgetContainer
      onClose={onClose}
      onMinimize={onMinimize}
      title="Send a Message"
      subtitle="Please provide details about your issue"
    >
      <Body>
        <BackLink onClick={onBack}>
          <ArrowLeft size={15} /> Back to options
        </BackLink>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label $required>NIN</Label>
            <Input placeholder="Enter your 11-digit NIN" {...register("nin")} />
            {errors.nin && <ErrorText>{errors.nin.message}</ErrorText>}
          </Field>
          <Field>
            <Label $required>Full Name</Label>
            <Input
              placeholder="Enter your full name"
              {...register("fullName")}
            />
            {errors.fullName && (
              <ErrorText>{errors.fullName.message}</ErrorText>
            )}
          </Field>
          <Field>
            <Label $required>Phone Number</Label>
            <Input placeholder="08012345678" {...register("phoneNumber")} />
            {errors.phoneNumber && (
              <ErrorText>{errors.phoneNumber.message}</ErrorText>
            )}
          </Field>
          <Field>
            <Label $optional>Error Encountered</Label>
            <Input
              placeholder="E.g. Payment failed"
              {...register("errorEncountered")}
            />
          </Field>
          <Field>
            <Label $required>Full Description</Label>
            <Textarea
              rows={4}
              placeholder="Please describe the issue you encountered in detail..."
              {...register("description")}
            />
            {errors.description && (
              <ErrorText>{errors.description.message}</ErrorText>
            )}
          </Field>

          <Button
            type="submit"
            style={{ width: "100%" }}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <>
                <Loader2
                  size={16}
                  style={{ animation: "spin 1s linear infinite" }}
                />{" "}
                Submitting...
              </>
            ) : (
              "Submit Complaint"
            )}
          </Button>
        </form>
      </Body>
    </WidgetContainer>
  );
};
