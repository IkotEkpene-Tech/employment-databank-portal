import styled from "styled-components";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, Button } from "@/shared/ui";
import type { VerifyEmploymentAccessResponse } from "../api/types";

const Details = styled.dl`
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1rem 1.25rem;
  margin: 0 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
`;

const DT = styled.dt`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0 0 0.25rem;
`;

const DD = styled.dd`
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface NinConfirmModalProps {
  open: boolean;
  data: VerifyEmploymentAccessResponse | null;
  onClose: () => void;
  onConfirm: () => void;
  onRetry: () => void;
  isConfirming?: boolean;
}

export const NinConfirmModal = ({ open, data, onClose, onConfirm, onRetry, isConfirming }: NinConfirmModalProps) => (
  <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
    <DialogContent>
      <DialogTitle>Confirm your details</DialogTitle>
      <DialogDescription>Is this you? Once confirmed, these details cannot be changed.</DialogDescription>
      {data && (
        <Details>
          <div>
            <DT>Full Name</DT>
            <DD>
              {data.firstName} {data.surname} {data.otherName ?? ""}
            </DD>
          </div>
          <div>
            <DT>Date of Birth</DT>
            <DD>{data.dob}</DD>
          </div>
          <div>
            <DT>Gender</DT>
            <DD style={{ textTransform: "capitalize" }}>{data.gender}</DD>
          </div>
        </Details>
      )}
      <Actions>
        <Button style={{ width: "100%" }} onClick={onConfirm} disabled={isConfirming}>
          <CheckCircle2 size={16} /> {isConfirming ? "Saving..." : "Yes, This Is Correct"}
        </Button>
        <Button variant="outline" style={{ width: "100%" }} onClick={onRetry} disabled={isConfirming}>
          <RefreshCw size={16} /> Enter a Different NIN
        </Button>
      </Actions>
    </DialogContent>
  </Dialog>
);
