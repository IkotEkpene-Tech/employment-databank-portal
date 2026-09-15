import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { DashboardShell, PageLoader } from "@/shared/components";
import { useAuth } from "@/features/auth/context/AuthContext";
import { getApplicantSummary } from "../api";
import { ProfileSummaryCard } from "../components/ProfileSummaryCard";
import { ApplicationStatusCard } from "../components/ApplicationStatusCard";
import { AccessCodeCard } from "../components/AccessCodeCard";
import { StartRegistrationCta } from "../components/StartRegistrationCta";

const Greeting = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0 0 1.5rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
`;

export const DashboardPage = () => {
  const { user } = useAuth();
  const summaryQuery = useQuery({
    queryKey: ["dashboard-summary", user?.id],
    queryFn: getApplicantSummary,
    enabled: Boolean(user),
  });

  if (!user) return null;

  const displayUser = summaryQuery.data ?? user;

  return (
    <DashboardShell title="Overview">
      <Greeting>Welcome back{displayUser.firstName ? `, ${displayUser.firstName}` : ""}.</Greeting>
      {summaryQuery.isLoading && <PageLoader title="Loading your dashboard..." />}
      <StartRegistrationCta user={displayUser} />
      <CardGrid>
        <ProfileSummaryCard user={displayUser} />
        <ApplicationStatusCard user={displayUser} />
        <AccessCodeCard user={displayUser} />
      </CardGrid>
    </DashboardShell>
  );
};
