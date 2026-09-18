import styled from "styled-components";
import { LogOut, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, Button } from "@/shared/ui";

const IconWrap = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.12)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.75rem;
  flex-direction: column;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.sm})`} {
    flex-direction: row;
  }
`;

const ActionButton = styled(Button)`
  flex: 1;
  width: 100%;
  min-height: 3.25rem;
  font-size: 1rem;
`;

const Spin = styled(Loader2)`
  animation: spin 1s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

interface LogoutConfirmModalProps {
  open: boolean;
  isLoggingOut: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmModal = ({ open, isLoggingOut, onCancel, onConfirm }: LogoutConfirmModalProps) => (
  <Dialog open={open} onOpenChange={(next) => !next && onCancel()}>
    <DialogContent hideClose={isLoggingOut}>
      <IconWrap>
        <LogOut size={22} />
      </IconWrap>
      <DialogTitle>Log out and exit?</DialogTitle>
      <DialogDescription>
        You&apos;ll need to log in again to access your dashboard and continue your application.
      </DialogDescription>
      <Actions>
        <ActionButton variant="outline" onClick={onCancel} disabled={isLoggingOut}>
          Stay Logged In
        </ActionButton>
        <ActionButton variant="secondary" onClick={onConfirm} disabled={isLoggingOut}>
          {isLoggingOut ? (
            <>
              <Spin size={18} /> Logging out...
            </>
          ) : (
            "Log Out"
          )}
        </ActionButton>
      </Actions>
    </DialogContent>
  </Dialog>
);
