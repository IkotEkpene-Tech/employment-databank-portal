import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { FileText, CheckCircle2, Lock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/ui";
import { PageLoader } from "@/shared/components";
import { getSubmittedApplication } from "../api";
import { educationalQualifications } from "../data/lookups";

const Wrap = styled.div`
  max-width: 42rem;
  margin: 0 auto;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: ${({ theme }) => theme.alpha(theme.colors.success.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.success.DEFAULT};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 0.85rem 1.1rem;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const LockNote = styled.p`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0 0 1.5rem;
`;

const StyledCard = styled(Card)`
  margin-bottom: 1.25rem;
`;

const Grid = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin: 0;
`;

const DT = styled.dt`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0 0 0.25rem;
`;

const DD = styled.dd`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`;

const DocLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent.DEFAULT};
  text-decoration: underline;
`;

export const SubmittedApplicationView = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["submitted-application"],
    queryFn: getSubmittedApplication,
  });

  if (isLoading) return <PageLoader title="Loading your application..." />;

  if (isError || !data) {
    return (
      <Wrap>
        <p style={{ textAlign: "center", color: "#677E76" }}>
          {error instanceof Error ? error.message : "Couldn't load your submitted application."}
        </p>
      </Wrap>
    );
  }

  const qualificationLabel = educationalQualifications.find((q) => q.id === data.highestQualification)?.label;

  return (
    <Wrap>
      <Banner>
        <CheckCircle2 size={18} /> Application submitted{data.applicantId ? ` — ID ${data.applicantId}` : ""}
      </Banner>
      <LockNote>
        <Lock size={14} /> This application is final and cannot be edited.
      </LockNote>

      <StyledCard>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>As verified via your NIN</CardDescription>
        </CardHeader>
        <CardContent>
          <Grid>
            <div>
              <DT>Full Name</DT>
              <DD>
                {data.firstName} {data.surname} {data.otherName ?? ""}
              </DD>
            </div>
            <div>
              <DT>Gender</DT>
              <DD style={{ textTransform: "capitalize" }}>{data.gender}</DD>
            </div>
            <div>
              <DT>Date of Birth</DT>
              <DD>{data.dob}</DD>
            </div>
            <div>
              <DT>Voter ID (VIN)</DT>
              <DD>{data.vin}</DD>
            </div>
          </Grid>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardHeader>
          <CardTitle>Location</CardTitle>
        </CardHeader>
        <CardContent>
          <Grid>
            <div>
              <DT>Ward</DT>
              <DD>{data.ward}</DD>
            </div>
            <div>
              <DT>Village</DT>
              <DD>{data.village}</DD>
            </div>
            <div>
              <DT>Village Head</DT>
              <DD>{data.villageHeadName}</DD>
            </div>
            <div>
              <DT>Village Head Phone</DT>
              <DD>{data.villageHeadPhone}</DD>
            </div>
          </Grid>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardHeader>
          <CardTitle>Education &amp; Skills</CardTitle>
        </CardHeader>
        <CardContent>
          <Grid>
            <div>
              <DT>Has Education</DT>
              <DD style={{ textTransform: "capitalize" }}>{data.hasEducation}</DD>
            </div>
            {data.hasEducation === "yes" && (
              <>
                <div>
                  <DT>Highest Qualification</DT>
                  <DD>{qualificationLabel ?? data.highestQualification}</DD>
                </div>
                <div>
                  <DT>Discipline</DT>
                  <DD>{data.discipline === "Other" ? data.otherDiscipline : data.discipline}</DD>
                </div>
              </>
            )}
            <div>
              <DT>Primary Skill</DT>
              <DD>{data.vocationalSkill === "Other" ? data.otherSkill : data.vocationalSkill}</DD>
            </div>
            {data.skillAcquisition && (
              <div>
                <DT>Skill to Learn</DT>
                <DD>{data.skillAcquisition === "Other" ? data.otherSkillAcquisition : data.skillAcquisition}</DD>
              </div>
            )}
          </Grid>
        </CardContent>
      </StyledCard>

      <StyledCard>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <DocLink href={data.certificateOfOriginUrl} target="_blank" rel="noopener noreferrer">
            <FileText size={15} /> Certificate of Origin
          </DocLink>
          {data.certificateUrl && (
            <DocLink href={data.certificateUrl} target="_blank" rel="noopener noreferrer">
              <FileText size={15} /> Educational Certificate
            </DocLink>
          )}
        </CardContent>
      </StyledCard>
    </Wrap>
  );
};
