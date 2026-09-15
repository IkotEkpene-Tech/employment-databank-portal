import { ReactNode } from "react";
import styled from "styled-components";
import { AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/shared/ui";
import { Button } from "@/shared/ui";

export type ModalType = "info" | "success" | "error" | "warning" | "confirm";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  message?: string;
  type?: ModalType;
  children?: ReactNode;
  showOneButton?: boolean;
  proceedText?: string;
  cancelText?: string;
  onProceed?: () => void;
  onCancel?: () => void;
}

const IconWrap = styled.div<{ $type: ModalType }>`
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  background: ${({ theme, $type }) =>
    $type === "error"
      ? theme.alpha(theme.colors.destructive.DEFAULT, 0.1)
      : $type === "warning"
        ? theme.alpha(theme.colors.secondary.DEFAULT, 0.12)
        : theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.sm} {
    flex-direction: row;
  }
`;

const iconFor = (type: ModalType) => {
  switch (type) {
    case "success":
      return <CheckCircle2 color="#0B4923" size={26} />;
    case "error":
      return <XCircle color="#EF4444" size={26} />;
    case "warning":
      return <AlertTriangle color="#FE6301" size={26} />;
    case "confirm":
      return <AlertTriangle color="#FE6301" size={26} />;
    default:
      return <Info color="#0B4923" size={26} />;
  }
};

export const Modal = ({
  open,
  onClose,
  title,
  subtitle,
  message,
  type = "info",
  children,
  showOneButton,
  proceedText = "Confirm",
  cancelText = "Cancel",
  onProceed,
  onCancel,
}: ModalProps) => (
  <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
    <DialogContent>
      <IconWrap $type={type}>{iconFor(type)}</IconWrap>
      <DialogTitle>{title}</DialogTitle>
      {subtitle && <DialogDescription>{subtitle}</DialogDescription>}
      {message && <p style={{ fontSize: "0.875rem", color: "#384252" }}>{message}</p>}
      {children}
      <Actions>
        {showOneButton ? (
          <Button style={{ width: "100%" }} onClick={onProceed ?? onClose}>
            {proceedText}
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              style={{ flex: 1 }}
              onClick={() => {
                onCancel?.();
                onClose();
              }}
            >
              {cancelText}
            </Button>
            <Button
              style={{ flex: 1 }}
              onClick={() => {
                onProceed?.();
              }}
            >
              {proceedText}
            </Button>
          </>
        )}
      </Actions>
    </DialogContent>
  </Dialog>
);
