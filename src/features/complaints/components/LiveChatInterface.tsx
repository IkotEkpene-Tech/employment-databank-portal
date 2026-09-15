import styled from "styled-components";
import { ArrowLeft, Clock, MessageCircle } from "lucide-react";
import { WidgetContainer } from "./WidgetContainer";

const Body = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const BackLink = styled.button`
  align-self: flex-start;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
`;

const IconCircle = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  onBack: () => void;
  onClose: () => void;
  onMinimize: () => void;
}

export const LiveChatInterface = ({ onBack, onClose, onMinimize }: Props) => (
  <WidgetContainer onClose={onClose} onMinimize={onMinimize} title="Live Chat" subtitle="Coming Soon">
    <Body>
      <BackLink onClick={onBack}>
        <ArrowLeft size={15} /> Back to options
      </BackLink>
      <IconCircle>
        <MessageCircle size={30} />
      </IconCircle>
      <div>
        <p style={{ fontWeight: 600, margin: 0 }}>Live Chat Coming Soon!</p>
        <p style={{ fontSize: "0.8125rem", color: "#8fa59a", maxWidth: "16rem" }}>
          We're working hard to bring you real-time chat support. Please use the message form for now.
        </p>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", color: "#8fa59a" }}>
        <Clock size={14} /> Estimated launch: Q2 2026
      </div>
    </Body>
  </WidgetContainer>
);
