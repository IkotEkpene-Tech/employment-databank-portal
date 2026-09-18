import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { AuthLayout } from "../components/AuthLayout";
import { PasswordLoginForm } from "../components/PasswordLoginForm";
import { OtpLoginForm } from "../components/OtpLoginForm";

const Toggle = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 0.25rem;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  flex: 1;
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary.DEFAULT : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary.foreground : theme.colors.muted.foreground};
  padding: 0.6rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ $active }) => ($active ? 1 : 0.5)};
  }
`;

type LoginTab = "password" | "otp";

export const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<LoginTab>(
    searchParams.get("tab") === "otp" ? "otp" : "password",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title="Log in to your account"
      footer={
        <>
          Don&apos;t have an account? <Link to="/register">Register</Link>
        </>
      }
    >
      <Toggle>
        <ToggleButton
          type="button"
          $active={tab === "password"}
          disabled={isSubmitting}
          onClick={() => setTab("password")}
        >
          Password
        </ToggleButton>
        <ToggleButton
          type="button"
          $active={tab === "otp"}
          disabled={isSubmitting}
          onClick={() => setTab("otp")}
        >
          One-Time Code
        </ToggleButton>
      </Toggle>

      {tab === "password" ? (
        <PasswordLoginForm onSubmittingChange={setIsSubmitting} />
      ) : (
        <OtpLoginForm onSubmittingChange={setIsSubmitting} />
      )}
    </AuthLayout>
  );
};
