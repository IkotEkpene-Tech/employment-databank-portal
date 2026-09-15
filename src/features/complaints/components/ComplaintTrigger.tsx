import styled from "styled-components";
import { MessageCircleMore } from "lucide-react";

const Wrap = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.25rem;
  z-index: ${({ theme }) => theme.zIndex.floatingAction};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Trigger = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.75)};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.xl};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.DEFAULT};
    transform: scale(1.05);
  }
`;

const Label = styled.span`
  margin-top: 0.4rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

export const ComplaintTrigger = ({ onClick }: { onClick: () => void }) => (
  <Wrap>
    <Trigger onClick={onClick} aria-label="Open complaint form">
      <MessageCircleMore size={26} />
    </Trigger>
    <Label>Complaint?</Label>
  </Wrap>
);
