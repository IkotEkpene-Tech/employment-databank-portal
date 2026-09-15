import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { PageShell, PageHeroBanner, Container } from "@/shared/components";

const Wrap = styled.div`
  padding: 3rem 0 5rem;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  align-items: start;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    grid-template-columns: 15rem 1fr;
  }
`;

const Sidebar = styled.aside`
  display: none;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    display: block;
    position: sticky;
    top: 6rem;
  }
`;

const SidebarCard = styled.div`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const SidebarTitle = styled.p`
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray500};
  margin: 0 0 0.75rem;
`;

const TocLink = styled.a<{ $active: boolean }>`
  display: block;
  padding: 0.5rem 0.7rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 0.15rem;
  color: ${({ theme, $active }) => ($active ? theme.colors.primary.DEFAULT : theme.colors.gray500)};
  background: ${({ theme, $active }) => ($active ? theme.alpha(theme.colors.primary.DEFAULT, 0.08) : "transparent")};
  border-left: 3px solid ${({ theme, $active }) => ($active ? theme.colors.secondary.DEFAULT : "transparent")};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
    background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.06)};
  }
`;

const Content = styled.div`
  max-width: 44rem;
`;

const UpdatedAt = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.gray500};
  margin: 0 0 1.5rem;
`;

export interface LegalTocItem {
  id: string;
  label: string;
}

interface LegalLayoutProps {
  title: string;
  documentTitle: string;
  eyebrow?: string;
  toc: LegalTocItem[];
  summary?: ReactNode;
  children: ReactNode;
}

export const LegalLayout = ({ title, documentTitle, eyebrow, toc, summary, children }: LegalLayoutProps) => {
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    document.title = `${documentTitle} · Ikot Ekpene LGA Employment Databank`;
  }, [documentTitle]);

  useEffect(() => {
    const elements = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <PageShell>
      <PageHeroBanner eyebrow={eyebrow ?? "Legal"} title={title} />
      <Wrap>
        <Container>
          <Grid>
            <Sidebar>
              <SidebarCard>
                <SidebarTitle>On this page</SidebarTitle>
                {toc.map((item) => (
                  <TocLink key={item.id} href={`#${item.id}`} $active={activeId === item.id}>
                    {item.label}
                  </TocLink>
                ))}
              </SidebarCard>
            </Sidebar>

            <Content>
              <UpdatedAt>Last updated: January 2026</UpdatedAt>
              {summary}
              {children}
            </Content>
          </Grid>
        </Container>
      </Wrap>
    </PageShell>
  );
};
