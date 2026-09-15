import styled from "styled-components";
import { MessageSquare, MessageCircle } from "lucide-react";
import { WidgetContainer } from "./WidgetContainer";
import type { ComplaintMode } from "./types";

const Body = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  background: #ffffff;
  cursor: pointer;
  text-align: left;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }
`;

const IconCircle = styled.div<{ $accent?: boolean }>`
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ theme, $accent }) =>
    $accent ? theme.alpha(theme.colors.secondary.DEFAULT, 0.1) : theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  color: ${({ theme, $accent }) => ($accent ? theme.colors.secondary.DEFAULT : theme.colors.primary.DEFAULT)};
`;

const OptionTitle = styled.p`
  font-weight: 600;
  margin: 0;
  font-size: 0.9375rem;
`;

const OptionSub = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0.15rem 0 0;
`;

interface ChoiceModalProps {
  onClose: () => void;
  onSelectMode: (mode: ComplaintMode) => void;
  onMinimize: () => void;
}

export const ChoiceModal = ({ onClose, onSelectMode, onMinimize }: ChoiceModalProps) => (
  <WidgetContainer onClose={onClose} onMinimize={onMinimize} title="Help & Support" subtitle="How can we help you?">
    <Body>
      <OptionButton onClick={() => onSelectMode("message")}>
        <IconCircle>
          <MessageSquare size={22} />
        </IconCircle>
        <div>
          <OptionTitle>Send a Message</OptionTitle>
          <OptionSub>Submit a detailed complaint via form</OptionSub>
        </div>
      </OptionButton>

      <OptionButton onClick={() => onSelectMode("chat")}>
        <IconCircle $accent>
          <MessageCircle size={22} />
        </IconCircle>
        <div>
          <OptionTitle>Live Chat</OptionTitle>
          <OptionSub>Chat with a support agent in real-time</OptionSub>
        </div>
      </OptionButton>
    </Body>
  </WidgetContainer>
);
