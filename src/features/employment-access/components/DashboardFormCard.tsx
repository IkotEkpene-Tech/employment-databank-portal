import { ReactNode } from "react";
import styled from "styled-components";
import { Card, CardContent } from "@/shared/ui";

const Wrap = styled(Card)`
  max-width: 30rem;
  margin: 0 auto;
`;

const Body = styled(CardContent)`
  padding: 2rem;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  margin: 0 0 0.5rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0 0 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0 0 1.5rem;
`;

interface DashboardFormCardProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const DashboardFormCard = ({ eyebrow, title, subtitle, children }: DashboardFormCardProps) => (
  <Wrap>
    <Body>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Body>
  </Wrap>
);
