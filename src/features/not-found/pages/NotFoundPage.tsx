import { Link } from "react-router-dom";
import styled from "styled-components";
import { PageShell } from "@/shared/components";
import { Button } from "@/shared/ui";

const Wrap = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 3rem 1.25rem;
`;

const Code = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  margin: 0;
`;

export const NotFoundPage = () => (
  <PageShell>
    <Wrap>
      <Code>404</Code>
      <Title>This page could not be found.</Title>
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </Wrap>
  </PageShell>
);
