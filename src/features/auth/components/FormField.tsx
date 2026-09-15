import { ReactNode } from "react";
import styled from "styled-components";
import { Label } from "@/shared/ui";

const Field = styled.div`
  margin-bottom: 1.1rem;
`;

const ErrorText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  margin: 0.35rem 0 0;
`;

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export const FormField = ({ label, required, error, children }: FormFieldProps) => (
  <Field>
    <Label $required={required}>{label}</Label>
    {children}
    {error && <ErrorText>{error}</ErrorText>}
  </Field>
);
