import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { Reveal, Container } from "@/shared/components";
import { Button } from "@/shared/ui";
import {
  ACCOUNT_REQUIREMENTS,
  APPLICATION_REQUIREMENTS,
} from "@/shared/content/requirements";

const Section = styled.section`
  padding: 5rem 0;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  scroll-margin-top: 5rem;
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

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

const Groups = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 2.5rem;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    grid-template-columns: 1fr 1fr;
  }
`;

const GroupCard = styled.div`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.75rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const GroupStep = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
  background: ${({ theme }) =>
    theme.alpha(theme.colors.secondary.DEFAULT, 0.1)};
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  margin: 0 0 0.75rem;
`;

const GroupTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0 0 1rem;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
`;

const IconBadge = styled.div`
  width: 2.15rem;
  height: 2.15rem;
  flex-shrink: 0;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

const CtaRow = styled.div`
  display: flex;
  justify-content: center;
`;

export const RequirementsSection = () => {
  return (
    <Section id="requirements">
      <Container>
        <Reveal>
          <Header>
            <Eyebrow>Before You Begin</Eyebrow>
            <Title>Everything you'll need</Title>
            <Subtitle>
              Applying happens in two phases — creating your account, then
              applying for employment. Here's what each one requires.
            </Subtitle>
          </Header>
        </Reveal>

        <Reveal>
          <Groups>
            <GroupCard>
              <GroupStep>Phase 1</GroupStep>
              <GroupTitle>Create an account</GroupTitle>
              <List>
                {ACCOUNT_REQUIREMENTS.map(({ icon: Icon, text }) => (
                  <ListItem key={text}>
                    <IconBadge>
                      <Icon size={17} />
                    </IconBadge>
                    {text}
                  </ListItem>
                ))}
              </List>
            </GroupCard>

            <GroupCard>
              <GroupStep>Phase 2</GroupStep>
              <GroupTitle>Apply for employment</GroupTitle>
              <List>
                {APPLICATION_REQUIREMENTS.map(({ icon: Icon, text }) => (
                  <ListItem key={text}>
                    <IconBadge>
                      <Icon size={17} />
                    </IconBadge>
                    {text}
                  </ListItem>
                ))}
              </List>
            </GroupCard>
          </Groups>
        </Reveal>

        <Reveal>
          <CtaRow>
            <Button asChild size="lg">
              <Link to="/register">
                Create Your Account <ArrowRight size={18} />
              </Link>
            </Button>
          </CtaRow>
        </Reveal>
      </Container>
    </Section>
  );
};
