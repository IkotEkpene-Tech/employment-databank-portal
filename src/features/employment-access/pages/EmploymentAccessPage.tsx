import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { DashboardShell } from "@/shared/components";
import { useAuth } from "@/features/auth/context/AuthContext";
import { toast } from "@/shared/ui";
import { verifyEmploymentAccess, confirmEmploymentAccess } from "../api";
import { AccessCodeGateForm } from "../components/AccessCodeGateForm";
import { PayForAccessForm } from "../components/PayForAccessForm";
import { NinConfirmModal } from "../components/NinConfirmModal";
import { DashboardFormCard } from "../components/DashboardFormCard";
import type { VerifyEmploymentAccessResponse } from "../api/types";
import type { AccessCodeGateValues } from "../components/AccessCodeGateForm";

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
  background: ${({ theme, $active }) => ($active ? theme.colors.primary.DEFAULT : "transparent")};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary.foreground : theme.colors.muted.foreground)};
  padding: 0.6rem 0.5rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
`;

interface LocationState {
  nin?: string;
  accessCode?: string;
}

export const EmploymentAccessPage = () => {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const prefill = (location.state as LocationState | null) ?? {};

  const [mode, setMode] = useState<"gate" | "pay">("gate");
  const [confirmData, setConfirmData] = useState<VerifyEmploymentAccessResponse | null>(null);
  const [credentials, setCredentials] = useState<AccessCodeGateValues | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const verifyMutation = useMutation({
    mutationFn: verifyEmploymentAccess,
    onSuccess: (data, variables) => {
      setCredentials(variables);
      if (data.alreadyConfirmed) {
        toast.success("Access verified. Continuing your application...");
        navigate("/employment-registration", { state: { accessVerified: true } });
        return;
      }
      setConfirmData(data);
      setShowConfirmModal(true);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Invalid NIN or access code"),
  });

  const confirmMutation = useMutation({
    mutationFn: confirmEmploymentAccess,
    onSuccess: async () => {
      await refreshUser();
      toast.success("Details confirmed. Let's get started!");
      navigate("/employment-registration", { state: { accessVerified: true } });
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Could not save your details"),
  });

  const handleRetry = () => {
    setShowConfirmModal(false);
    setConfirmData(null);
    setCredentials(null);
  };

  return (
    <DashboardShell title="Employment Application">
      <DashboardFormCard
        eyebrow="Employment Application"
        title="Verify to continue"
        subtitle="Enter your NIN and access code every time you begin or resume your application."
      >
      <Toggle>
        <ToggleButton type="button" $active={mode === "gate"} onClick={() => setMode("gate")}>
          I Have an Access Code
        </ToggleButton>
        <ToggleButton type="button" $active={mode === "pay"} onClick={() => setMode("pay")}>
          Pay for Access Code
        </ToggleButton>
      </Toggle>

      {mode === "gate" ? (
        <>
          <AccessCodeGateForm
            onSubmit={(values) => verifyMutation.mutateAsync(values)}
            isSubmitting={verifyMutation.isPending}
            defaultNin={prefill.nin}
            defaultAccessCode={prefill.accessCode}
          />
          <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.8125rem" }}>
            Don&apos;t have a code, or has it expired?{" "}
            <button
              type="button"
              onClick={() => setMode("pay")}
              style={{ background: "none", border: "none", color: "#FE6301", fontWeight: 600, cursor: "pointer", padding: 0 }}
            >
              Pay for a new one
            </button>
          </div>
        </>
      ) : (
        <PayForAccessForm />
      )}

      <NinConfirmModal
        open={showConfirmModal}
        data={confirmData}
        onClose={() => setShowConfirmModal(false)}
        onRetry={handleRetry}
        isConfirming={confirmMutation.isPending}
        onConfirm={() => {
          if (credentials) confirmMutation.mutate(credentials);
        }}
      />
      </DashboardFormCard>
    </DashboardShell>
  );
};
