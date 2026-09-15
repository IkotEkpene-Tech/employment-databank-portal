import styled from "styled-components";
import { Reveal, Container } from "@/shared/components";

const Section = styled.section`
  padding: 5rem 0;
  background: #ffffff;
`;

const Header = styled.div`
  text-align: center;
  max-width: 40rem;
  margin: 0 auto 3rem;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  margin: 0 0 0.75rem;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0 0 0.75rem;
`;

const Copy = styled.p`
  color: ${({ theme }) => theme.colors.muted.foreground};
  line-height: 1.7;
`;

export const AboutSection = () => (
  <Section id="about">
    <Container>
      <Reveal>
        <Header>
          <Eyebrow>About the Programme</Eyebrow>
          <Title>One databank, built for every indigene</Title>
          <Copy>
            Under the leadership of Hon. (Eld) Aniefiok Nkom, the Ikot Ekpene Local Government Area
            Employment Databank connects qualified indigenes to job opportunities, vocational
            training, and empowerment initiatives — all from a single verified registration.
          </Copy>
        </Header>
      </Reveal>
    </Container>
  </Section>
);
