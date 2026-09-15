import { UseFormReturn } from "react-hook-form";
import styled from "styled-components";
import { Shield, UploadCloud } from "lucide-react";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui";
import { FormField } from "@/features/auth/components/FormField";
import type { RegistrationFormValues } from "../../types";

const UploadZone = styled.label`
  display: block;
  width: 100%;
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.75rem;
  text-align: center;
  background: #f8fbf9;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }
`;

const IconCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem;
`;

const FileName = styled.p`
  font-weight: 600;
  font-size: 0.875rem;
  margin: 0 0 0.2rem;
`;

const Hint = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0;
`;

interface Props {
  form: UseFormReturn<RegistrationFormValues>;
}

export const DocumentsStep = ({ form }: Props) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const certificateOfOrigin = watch("certificateOfOrigin");

  return (
    <>
      <CardHeader>
        <CardTitle>Village Authority Verification</CardTitle>
        <CardDescription>Upload your Certificate of Origin to confirm you're truly from Ikot Ekpene</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          label="Upload Certificate of Origin"
          required
          error={errors.certificateOfOrigin?.message as string | undefined}
        >
          <UploadZone>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
              onChange={(e) => setValue("certificateOfOrigin", e.target.files?.[0] ?? null)}
            />
            <IconCircle>
              <Shield size={18} />
            </IconCircle>
            <FileName>
              {certificateOfOrigin ? certificateOfOrigin.name : "Click to upload your Certificate of Origin"}
            </FileName>
            <Hint>PDF, JPG or PNG — max 5MB</Hint>
          </UploadZone>
        </FormField>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#677E76", fontSize: "0.8125rem", marginTop: "1rem" }}>
          <UploadCloud size={15} />
          Documents must be PDF, JPG, or PNG and no larger than 5MB.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#677E76", fontSize: "0.8125rem", marginTop: "0.5rem" }}>
          <UploadCloud size={15} />
          Note: uploaded files aren't saved with your progress — if you resumed a saved registration, please re-attach this document.
        </div>
      </CardContent>
    </>
  );
};
