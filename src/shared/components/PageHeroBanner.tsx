import { ReactNode } from "react";
import styled from "styled-components";
import { Container } from "./Container";

const Banner = styled.div`
  background: ${({ theme }) => theme.gradients.hero};
  padding: 4rem 1.25rem 3rem;
  text-align: center;
  color: #ffffff;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.highlightMuted};
  margin: 0 0 0.75rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin: 0 0 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  opacity: 0.85;
  max-width: 34rem;
  margin: 0 auto;
`;

interface PageHeroBannerProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export const PageHeroBanner = ({ eyebrow, title, subtitle, children }: PageHeroBannerProps) => (
  <Banner>
    <Container>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Container>
  </Banner>
);
