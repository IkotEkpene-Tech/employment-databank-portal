import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { AlertTriangle, CheckCircle2, Copy, Loader2, RefreshCw, XCircle } from "lucide-react";
import { DashboardShell } from "@/shared/components";
import { Button, toast } from "@/shared/ui";
import { getAccessPaymentStatus } from "../api";
import { DashboardFormCard } from "../components/DashboardFormCard";
import { accessCodeCache } from "../lib/accessCodeCache";
import { useAuth } from "@/features/auth/context/AuthContext";

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

const Message = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin-bottom: 1.5rem;
`;

const CodeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  border: 1.5px dashed ${({ theme }) => theme.colors.secondary.DEFAULT};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.25rem;
  margin-bottom: 1rem;
`;

const Code = styled.span`
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

const Warning = styled.p`
  text-align: center;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.destructive.DEFAULT};
  margin-bottom: 1.5rem;
`;

export const AccessPaymentStatusPage = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference") ?? "";
  const redirectError = searchParams.get("error") ?? "";
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const statusQuery = useQuery({
    queryKey: ["access-payment-status", reference],
    queryFn: () => getAccessPaymentStatus(reference),
    enabled: Boolean(reference),
    retry: 1,
  });

  // The backend clears the plaintext code after the first read, so cache it
  // locally the moment we see it — this is the only chance to keep a copy
  // for the dashboard's reveal/copy card.
  useEffect(() => {
    if (statusQuery.data?.accessCode && user) {
      accessCodeCache.set(user.id, statusQuery.data.accessCode);
    }
  }, [statusQuery.data?.accessCode, user]);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Access code copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy — please copy it manually");
    }
  };

  if (redirectError === "missing_reference" || !reference) {
    return (
      <DashboardShell title="Employment Application">
        <DashboardFormCard title="Something went wrong">
          <IconWrap>
            <AlertTriangle size={48} color="#EF4444" />
          </IconWrap>
          <Message>We couldn&apos;t find a payment reference for that checkout attempt.</Message>
          <Button style={{ width: "100%" }} onClick={() => navigate("/apply")}>
            Back to Application
          </Button>
        </DashboardFormCard>
      </DashboardShell>
    );
  }

  if (statusQuery.isLoading) {
    return (
      <DashboardShell title="Employment Application">
        <DashboardFormCard title="Confirming your payment...">
          <IconWrap>
            <Loader2 size={40} color="#0B4923" style={{ animation: "spin 1s linear infinite" }} />
          </IconWrap>
          <Message>Please wait while we confirm your payment and generate your access code.</Message>
        </DashboardFormCard>
      </DashboardShell>
    );
  }

  if (statusQuery.isError) {
    return (
      <DashboardShell title="Employment Application">
        <DashboardFormCard title="Couldn't fetch payment status">
          <IconWrap>
            <AlertTriangle size={48} color="#EF4444" />
          </IconWrap>
          <Message>
            {statusQuery.error instanceof Error ? statusQuery.error.message : "Something went wrong. Please try again."}
          </Message>
          <Button style={{ width: "100%" }} onClick={() => statusQuery.refetch()}>
            <RefreshCw size={16} /> Try Again
          </Button>
        </DashboardFormCard>
      </DashboardShell>
    );
  }

  const { status, accessCode, nin } = statusQuery.data ?? { status: "pending" as const };

  if (status === "failed") {
    return (
      <DashboardShell title="Employment Application">
        <DashboardFormCard title="Payment was not successful">
          <IconWrap>
            <XCircle size={48} color="#EF4444" />
          </IconWrap>
          <Message>Your payment could not be confirmed. You can try paying again from the application page.</Message>
          <Button style={{ width: "100%" }} onClick={() => navigate("/apply")}>
            Back to Application
          </Button>
        </DashboardFormCard>
      </DashboardShell>
    );
  }

  if (status === "code_issued") {
    return (
      <DashboardShell title="Employment Application">
        <DashboardFormCard title="Payment confirmed!" subtitle="Your access code has been generated.">
          <IconWrap>
            <CheckCircle2 size={48} color="#0B4923" />
          </IconWrap>
          {accessCode && (
            <>
              <CodeBox>
                <Code>{accessCode}</Code>
                <Button type="button" size="sm" variant="outline" onClick={() => handleCopy(accessCode)}>
                  <Copy size={14} /> {copied ? "Copied" : "Copy"}
                </Button>
              </CodeBox>
              <Warning>Save this code now — it won&apos;t be shown again here. We&apos;ve also emailed it to you.</Warning>
            </>
          )}
          {!accessCode && <Message>Your access code has been emailed to you — check your inbox.</Message>}
          <Button style={{ width: "100%" }} onClick={() => navigate("/apply", { state: { nin, accessCode } })}>
            Continue to Application
          </Button>
        </DashboardFormCard>
      </DashboardShell>
    );
  }

  // status is "pending" or "processing" — payment is still being confirmed.
  return (
    <DashboardShell title="Employment Application">
      <DashboardFormCard title="Processing your payment">
        <IconWrap>
          <Loader2 size={40} color="#0B4923" style={{ animation: "spin 1s linear infinite" }} />
        </IconWrap>
        <Message>This is taking a little longer than usual. You can check again in a moment.</Message>
        <Button style={{ width: "100%" }} onClick={() => statusQuery.refetch()}>
          <RefreshCw size={16} /> Check Again
        </Button>
      </DashboardFormCard>
    </DashboardShell>
  );
};
