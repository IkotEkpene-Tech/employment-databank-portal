import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui";
import { RequirementsModal } from "@/features/employment-access";
import type { User } from "@/features/auth/api/types";

const Banner = styled.div`
  background: ${({ theme }) => theme.gradients.hero};
  color: #ffffff;
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  margin: 0 0 0.35rem;
`;

const Copy = styled.p`
  margin: 0;
  opacity: 0.85;
  font-size: 0.875rem;
  max-width: 26rem;
`;

const COPY_MAP: Partial<Record<User["applicationStatus"], { title: string; copy: string; cta: string }>> = {
  not_started: {
    title: "Ready to apply for employment?",
    copy: "You'll need your NIN and a ₦500 access code payment to begin.",
    cta: "Begin Application",
  },
  access_pending: {
    title: "Finish setting up your access",
    copy: "Your access-code payment is still processing — pick up where you left off.",
    cta: "Continue",
  },
  access_issued: {
    title: "You have an access code",
    copy: "Enter your NIN and access code to verify your identity and start applying.",
    cta: "Continue Application",
  },
  nin_verified: {
    title: "Continue your employment application",
    copy: "Your identity is verified — pick up where you left off on your application.",
    cta: "Continue Application",
  },
  in_progress: {
    title: "Pick up where you left off",
    copy: "You have a saved, unfinished application. Resume it whenever you're ready.",
    cta: "Continue Application",
  },
};

export const StartRegistrationCta = ({ user }: { user: User }) => {
  const [showRequirements, setShowRequirements] = useState(false);
  const navigate = useNavigate();
  const copy = COPY_MAP[user.applicationStatus];

  if (user.applicationStatus === "submitted") {
    return (
      <Banner>
        <div>
          <Title>Your application is complete</Title>
          <Copy>Thank you for applying — you'll be notified of any updates by email.</Copy>
        </div>
        <Button asChild variant="secondary">
          <Link to="/employment-registration">
            View My Application <ArrowRight size={16} />
          </Link>
        </Button>
      </Banner>
    );
  }

  if (!copy) return null;

  return (
    <>
      <Banner>
        <div>
          <Title>{copy.title}</Title>
          <Copy>{copy.copy}</Copy>
        </div>
        <Button variant="secondary" onClick={() => setShowRequirements(true)}>
          {copy.cta} <ArrowRight size={16} />
        </Button>
      </Banner>

      <RequirementsModal
        open={showRequirements}
        onClose={() => setShowRequirements(false)}
        onProceed={() => {
          setShowRequirements(false);
          navigate("/apply");
        }}
      />
    </>
  );
};
