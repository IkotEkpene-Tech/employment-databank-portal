import { ReactNode } from "react";
import styled from "styled-components";
import { X, ChevronDown, MessageCircle, MessageSquare } from "lucide-react";

const Panel = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.25rem;
  left: 1.25rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  margin-left: auto;
  width: calc(100% - 2.5rem);
  max-width: 24rem;
  max-height: 34rem;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  overflow: hidden;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.gradients.hero};
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

const IconCircle = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.75rem;
  opacity: 0.75;
  margin: 0;
`;

const IconButton = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  background: #fafcfb;
`;

interface WidgetContainerProps {
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  title?: string;
  subtitle?: string;
}

export const WidgetContainer = ({
  children,
  onClose,
  onMinimize,
  title = "Help & Support",
  subtitle = "How can we help you?",
}: WidgetContainerProps) => (
  <Panel>
    <Header>
      <HeaderInfo>
        <IconCircle>
          {title === "Live Chat" ? <MessageCircle size={16} /> : <MessageSquare size={16} />}
        </IconCircle>
        <div style={{ minWidth: 0 }}>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
      </HeaderInfo>
      <div style={{ display: "flex", gap: "0.35rem" }}>
        <IconButton onClick={onMinimize} aria-label="Minimize">
          <ChevronDown size={16} />
        </IconButton>
        <IconButton onClick={onClose} aria-label="Close">
          <X size={16} />
        </IconButton>
      </div>
    </Header>
    <Body>{children}</Body>
  </Panel>
);
