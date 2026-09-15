import styled from "styled-components";
import { Briefcase, GraduationCap, BellRing, ShieldCheck } from "lucide-react";
import { Reveal, Container } from "@/shared/components";

const Section = styled.section`
  padding: 5rem 0 3rem;
  color: #ffffff;
`;

const Header = styled.div`
  text-align: center;
  max-width: 36rem;
  margin: 0 auto 3rem;
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

const Subtitle = styled.p`
  opacity: 0.75;
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.5rem;
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const IconBadge = styled.div`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.alpha(theme.colors.highlight, 0.18)};
  color: ${({ theme }) => theme.colors.highlight};
`;

const CardTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 700;
  margin: 0 0 0.4rem;
`;

const CardCopy = styled.p`
  font-size: 0.8125rem;
  opacity: 0.75;
  line-height: 1.6;
  margin: 0;
`;

const REASONS = [
  {
    icon: Briefcase,
    title: "Priority for Job Placements",
    copy: "Registered indigenes are the first considered when job openings and referrals come through the LGA.",
  },
  {
    icon: GraduationCap,
    title: "Free Vocational Training",
    copy: "Get matched to skills-acquisition programmes based on what you already know and want to learn.",
  },
  {
    icon: BellRing,
    title: "Be First to Know",
    copy: "Verified applicants are notified directly by email as soon as new opportunities open up.",
  },
  {
    icon: ShieldCheck,
    title: "One Verified Record",
    copy: "Register once — your NIN-verified profile stays on file for every future programme.",
  },
];

export const WhyRegisterSection = () => (
  <Section id="why-register">
    <Container>
      <Reveal>
        <Header>
          <Eyebrow>Why Register</Eyebrow>
          <Title>Built to work for you</Title>
          <Subtitle>A single, verified record that opens the door to every opportunity we run.</Subtitle>
        </Header>
      </Reveal>

      <Reveal>
        <Grid>
          {REASONS.map(({ icon: Icon, title, copy }) => (
            <Card key={title}>
              <IconBadge>
                <Icon size={20} />
              </IconBadge>
              <CardTitle>{title}</CardTitle>
              <CardCopy>{copy}</CardCopy>
            </Card>
          ))}
        </Grid>
      </Reveal>
    </Container>
  </Section>
);
