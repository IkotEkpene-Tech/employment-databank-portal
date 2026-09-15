import styled from "styled-components";
import { Check } from "lucide-react";

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const StepDot = styled.div<{ $state: "done" | "active" | "pending" }>`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8125rem;
  font-weight: 700;
  flex-shrink: 0;
  background: ${({ theme, $state }) =>
    $state === "pending" ? theme.colors.muted.DEFAULT : theme.colors.primary.DEFAULT};
  color: ${({ theme, $state }) => ($state === "pending" ? theme.colors.muted.foreground : theme.colors.primary.foreground)};
`;

const Connector = styled.div<{ $active: boolean }>`
  flex: 1;
  height: 2px;
  background: ${({ theme, $active }) => ($active ? theme.colors.primary.DEFAULT : theme.colors.border)};
`;

const Label = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0.4rem 0 0;
  position: absolute;
  transform: translateX(-30%);
  white-space: nowrap;
`;

const StepWrap = styled.div`
  position: relative;
`;

interface StepProgressProps {
  steps: string[];
  current: number;
}

export const StepProgress = ({ steps, current }: StepProgressProps) => (
  <Row>
    {steps.map((label, index) => (
      <div key={label} style={{ display: "contents" }}>
        <StepWrap>
          <StepDot $state={index < current ? "done" : index === current ? "active" : "pending"}>
            {index < current ? <Check size={16} /> : index + 1}
          </StepDot>
          <Label>{label}</Label>
        </StepWrap>
        {index < steps.length - 1 && <Connector $active={index < current} />}
      </div>
    ))}
  </Row>
);
