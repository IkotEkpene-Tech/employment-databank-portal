import styled from "styled-components";
import { LogOut, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, Button } from "@/shared/ui";

const IconWrap = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.12)};
  color: ${({ theme }) => theme.colors.secondary.DEFAULT};
`;

const Actions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
  flex-direction: column;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.sm})`} {
    flex-direction: row;
  }
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
        <Button variant="outline" style={{ flex: 1 }} onClick={onCancel} disabled={isLoggingOut}>
          Stay Logged In
        </Button>
        <Button variant="secondary" style={{ flex: 1 }} onClick={onConfirm} disabled={isLoggingOut}>
          {isLoggingOut ? (
            <>
              <Spin size={16} /> Logging out...
            </>
          ) : (
            "Log Out"
          )}
        </Button>
      </Actions>
    </DialogContent>
  </Dialog>
);
