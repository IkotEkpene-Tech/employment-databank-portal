import styled from "styled-components";
import { ChevronUp, MessageCircleMore, X } from "lucide-react";

const Bar = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.25rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #ffffff;
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  padding: 0.6rem 0.9rem;
`;

const RestoreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  font-size: 0.8125rem;
  font-weight: 600;
`;

const IconCircle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: #8fa59a;
  cursor: pointer;
`;

interface Props {
  title: string;
  onRestore: () => void;
  onClose: () => void;
}

export const MinimizedWidget = ({ title, onRestore, onClose }: Props) => (
  <Bar>
    <RestoreButton onClick={onRestore}>
      <IconCircle>
        <MessageCircleMore size={16} />
      </IconCircle>
      {title}
      <ChevronUp size={16} />
    </RestoreButton>
    <CloseButton onClick={onClose} aria-label="Close">
      <X size={16} />
    </CloseButton>
  </Bar>
);
