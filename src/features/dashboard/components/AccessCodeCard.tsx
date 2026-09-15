import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { Eye, EyeOff, Copy, Clock, AlertTriangle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  toast,
} from "@/shared/ui";
import { getEmploymentAccessStatus } from "@/features/employment-access/api";
import { accessCodeCache } from "@/features/employment-access/lib/accessCodeCache";
import { useAuth } from "@/features/auth/context/AuthContext";
import type { User } from "@/features/auth/api/types";

const CodeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  border: 1.5px dashed ${({ theme }) => theme.colors.secondary.DEFAULT};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 0.85rem 1rem;
  margin-bottom: 0.85rem;
  flex-wrap: wrap;
`;

const Code = styled.span`
  font-family: monospace;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  flex: 1;
`;

const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted.foreground};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const InfoRow = styled.p<{ $tone?: "muted" | "destructive" }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  margin: 0 0 0.5rem;
  color: ${({ theme, $tone }) =>
    $tone === "destructive"
      ? theme.colors.destructive.DEFAULT
      : theme.colors.muted.foreground};
`;

const SHOWN_STATUSES: User["applicationStatus"][] = [
  "access_issued",
  "nin_verified",
  "in_progress",
];

const formatExpiry = (iso: string) =>
  new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

export const AccessCodeCard = ({ user }: { user: User }) => {
  const { user: authUser } = useAuth();
  const [revealed, setRevealed] = useState(false);

  const statusQuery = useQuery({
    queryKey: ["employment-access-status", user.id],
    queryFn: getEmploymentAccessStatus,
    enabled: SHOWN_STATUSES.includes(user.applicationStatus),
  });

  if (!SHOWN_STATUSES.includes(user.applicationStatus)) return null;

  const cachedCode = authUser ? accessCodeCache.get(authUser.id) : null;
  const expiresAt = statusQuery.data?.accessCodeExpiresAt;
  const isExpired = statusQuery.data?.accessCodeExpired ?? false;

  const handleCopy = async () => {
    if (!cachedCode) return;
    try {
      await navigator.clipboard.writeText(cachedCode);
      toast.success("Access code copied");
    } catch {
      toast.error("Could not copy — please copy it manually");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Access Code</CardTitle>
        <CardDescription>
          Needed each time you resume your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CodeRow>
          <Code>
            {cachedCode
              ? revealed
                ? cachedCode
                : "••••••••"
              : "Already Viewed"}
          </Code>
          {cachedCode && (
            <>
              <IconButton
                type="button"
                onClick={() => setRevealed((v) => !v)}
                aria-label={revealed ? "Hide code" : "Reveal code"}
              >
                {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
              </IconButton>
              <IconButton
                type="button"
                onClick={handleCopy}
                aria-label="Copy code"
              >
                <Copy size={16} />
              </IconButton>
            </>
          )}
        </CodeRow>

        {!cachedCode && (
          <InfoRow>
            Only shown once, right after payment — check your email if you
            didn't save it.
          </InfoRow>
        )}

        {expiresAt && !isExpired && (
          <InfoRow>
            <Clock size={14} /> Expires {formatExpiry(expiresAt)}
          </InfoRow>
        )}

        {isExpired && (
          <>
            <InfoRow $tone="destructive">
              <AlertTriangle size={14} /> This access code has expired.
            </InfoRow>
            <Button asChild size="sm" variant="secondary">
              <Link to="/apply">Pay for a New Access Code</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};
