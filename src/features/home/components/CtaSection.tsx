import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { Reveal, Container } from "@/shared/components";
import { Button } from "@/shared/ui";

const Section = styled.section`
  padding: 4.5rem 0;
  background: ${({ theme }) => theme.gradients.hero};
  color: #ffffff;
  text-align: center;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.highlight};
  margin: 0 0 0.75rem;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin: 0 0 0.75rem;
`;

const Copy = styled.p`
  opacity: 0.85;
  max-width: 30rem;
  margin: 0 auto 1.75rem;
`;

export const CtaSection = () => (
  <Section>
    <Container>
      <Reveal>
        <Eyebrow>Ready When You Are</Eyebrow>
        <Title>Get counted in the databank today</Title>
        <Copy>
          It only takes a few minutes to register, verify your NIN, and unlock access to job
          placements and skills programmes.
        </Copy>
        <Button asChild size="lg" variant="secondary">
          <Link to="/register">
            Begin Your Registration <ArrowRight size={18} />
          </Link>
        </Button>
      </Reveal>
    </Container>
  </Section>
);
