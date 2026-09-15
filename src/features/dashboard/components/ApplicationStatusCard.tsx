import styled from "styled-components";
import { CheckCircle2, Clock, PenLine, CreditCard, KeyRound } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui";
import type { User } from "@/features/auth/api/types";

type Tone = "success" | "secondary" | "muted";

const Badge = styled.div<{ $tone: Tone }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  background: ${({ theme, $tone }) =>
    $tone === "success"
      ? theme.alpha(theme.colors.success.DEFAULT, 0.12)
      : $tone === "secondary"
        ? theme.alpha(theme.colors.secondary.DEFAULT, 0.12)
        : theme.colors.muted.DEFAULT};
  color: ${({ theme, $tone }) =>
    $tone === "success"
      ? theme.colors.success.DEFAULT
      : $tone === "secondary"
        ? theme.colors.secondary.DEFAULT
        : theme.colors.muted.foreground};
`;

const STATUS_MAP: Record<User["applicationStatus"], { label: string; tone: Tone; icon: typeof CheckCircle2 }> = {
  not_started: { label: "Not started", tone: "muted", icon: Clock },
  access_pending: { label: "Payment processing", tone: "secondary", icon: CreditCard },
  access_issued: { label: "Access code issued", tone: "secondary", icon: KeyRound },
  nin_verified: { label: "NIN verified", tone: "secondary", icon: PenLine },
  in_progress: { label: "In progress", tone: "secondary", icon: PenLine },
  submitted: { label: "Submitted", tone: "success", icon: CheckCircle2 },
};

export const ApplicationStatusCard = ({ user }: { user: User }) => {
  const { label, tone, icon: Icon } = STATUS_MAP[user.applicationStatus];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Status</CardTitle>
        <CardDescription>Your employment application progress</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge $tone={tone}>
          <Icon size={16} />
          {label}
        </Badge>
      </CardContent>
    </Card>
  );
};
