import { ReactNode } from "react";
import styled from "styled-components";
import { PageShell, PageHeroBanner, Container } from "@/shared/components";
import { Card } from "@/shared/ui";

const Wrap = styled.div`
  padding: 3rem 1.25rem 5rem;
`;

const CardWrap = styled(Card)`
  max-width: 30rem;
  margin: -4.5rem auto 0;
  padding: 2rem;
  position: relative;
  z-index: 2;
`;

const FootNote = styled.p`
  text-align: center;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin-top: 1.25rem;

  a {
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
    font-weight: 600;
    text-decoration: underline;
  }
`;

interface AuthLayoutProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export const AuthLayout = ({ eyebrow, title, subtitle, children, footer }: AuthLayoutProps) => (
  <PageShell>
    <PageHeroBanner eyebrow={eyebrow} title={title} subtitle={subtitle} />
    <Wrap>
      <Container>
        <CardWrap>
          {children}
          {footer && <FootNote>{footer}</FootNote>}
        </CardWrap>
      </Container>
    </Wrap>
  </PageShell>
);
