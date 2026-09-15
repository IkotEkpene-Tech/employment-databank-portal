import styled from "styled-components";
import { Scale, Users, HeartHandshake, Eye } from "lucide-react";
import { Reveal, Container } from "@/shared/components";

const Section = styled.section`
  padding: 2rem 0 5.5rem;
  color: #ffffff;
`;

const Header = styled.div`
  text-align: center;
  max-width: 36rem;
  margin: 0 auto 2.5rem;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.highlightMuted};
  margin: 0 0 0.75rem;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  margin: 0;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem 3rem;
`;

const Value = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 12rem;
`;

const IconCircle = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.85rem;
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.highlightMuted, 0.4)};
  color: ${({ theme }) => theme.colors.highlightMuted};
`;

const ValueTitle = styled.p`
  font-weight: 700;
  font-size: 0.9375rem;
  margin: 0 0 0.35rem;
`;

const ValueCopy = styled.p`
  font-size: 0.8125rem;
  opacity: 0.7;
  line-height: 1.6;
  margin: 0;
`;

const VALUES = [
  { icon: Eye, title: "Transparency", copy: "Every step of registration and verification is tracked and visible to you." },
  { icon: Users, title: "Inclusion", copy: "Open to every eligible indigene, regardless of ward or background." },
  { icon: HeartHandshake, title: "Empowerment", copy: "Skills and job access designed to build lasting independence." },
  { icon: Scale, title: "Accountability", copy: "Fair, documented consideration for every registered applicant." },
];

export const ValuesSection = () => (
  <Section id="values">
    <Container>
      <Reveal>
        <Header>
          <Eyebrow>What Guides Us</Eyebrow>
          <Title>Our Values</Title>
        </Header>
      </Reveal>

      <Reveal>
        <Row>
          {VALUES.map(({ icon: Icon, title, copy }) => (
            <Value key={title}>
              <IconCircle>
                <Icon size={22} />
              </IconCircle>
              <ValueTitle>{title}</ValueTitle>
              <ValueCopy>{copy}</ValueCopy>
            </Value>
          ))}
        </Row>
      </Reveal>
    </Container>
  </Section>
);
