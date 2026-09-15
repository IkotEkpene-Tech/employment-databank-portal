import styled from "styled-components";
import { Sparkles } from "lucide-react";

const Box = styled.div`
  background: ${({ theme }) => theme.gradients.hero};
  color: #ffffff;
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 1.5rem 1.75rem;
  margin-bottom: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.elegant};
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
`;

const Eyebrow = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.highlightMuted};
  margin: 0;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.6rem 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.5;
  opacity: 0.95;

  &::before {
    content: "";
    width: 0.4rem;
    height: 0.4rem;
    margin-top: 0.4rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.highlight};
    flex-shrink: 0;
  }
`;

interface SummaryCalloutProps {
  points: string[];
}

export const SummaryCallout = ({ points }: SummaryCalloutProps) => (
  <Box>
    <Heading>
      <Sparkles size={16} color="#FDDF49" />
      <Eyebrow>Quick Summary</Eyebrow>
    </Heading>
    <List>
      {points.map((point) => (
        <Item key={point}>{point}</Item>
      ))}
    </List>
  </Box>
);
