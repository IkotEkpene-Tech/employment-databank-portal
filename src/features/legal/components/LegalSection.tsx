import { ReactNode } from "react";
import styled from "styled-components";
import type { LucideIcon } from "lucide-react";

type Tone = "primary" | "secondary" | "accent";

const Section = styled.section`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 1.75rem;
  margin-bottom: 1.5rem;
  scroll-margin-top: 6rem;
  transition: box-shadow ${({ theme }) => theme.transitions.base}, transform ${({ theme }) => theme.transitions.base};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
`;

const toneStyles = {
  primary: (theme: import("@/theme").Theme) => ({
    bg: theme.alpha(theme.colors.primary.DEFAULT, 0.1),
    fg: theme.colors.primary.DEFAULT,
  }),
  secondary: (theme: import("@/theme").Theme) => ({
    bg: theme.alpha(theme.colors.secondary.DEFAULT, 0.12),
    fg: theme.colors.secondary.DEFAULT,
  }),
  accent: (theme: import("@/theme").Theme) => ({
    bg: theme.alpha(theme.colors.accent.DEFAULT, 0.12),
    fg: theme.colors.accent.DEFAULT,
  }),
};

const IconBadge = styled.div<{ $tone: Tone }>`
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ theme, $tone }) => toneStyles[$tone](theme).bg};
  color: ${({ theme, $tone }) => toneStyles[$tone](theme).fg};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0;
`;

const Body = styled.div`
  font-size: 0.9375rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.gray700};

  p {
    margin: 0 0 0.75rem;
  }

  ul {
    margin: 0 0 0.75rem;
    padding-left: 1.25rem;
  }

  li {
    margin-bottom: 0.4rem;
  }

  a {
    color: ${({ theme }) => theme.colors.accent.DEFAULT};
    font-weight: 600;
    text-decoration: underline;
  }
`;

interface LegalSectionProps {
  id: string;
  icon: LucideIcon;
  tone?: Tone;
  title: string;
  children: ReactNode;
}

export const LegalSection = ({ id, icon: Icon, tone = "primary", title, children }: LegalSectionProps) => (
  <Section id={id}>
    <Heading>
      <IconBadge $tone={tone}>
        <Icon size={20} />
      </IconBadge>
      <Title>{title}</Title>
    </Heading>
    <Body>{children}</Body>
  </Section>
);
