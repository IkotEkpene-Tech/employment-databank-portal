import styled from "styled-components";
import { ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, Button } from "@/shared/ui";
import { APPLICATION_REQUIREMENTS } from "@/shared/content/requirements";

const List = styled.ul`
  list-style: none;
  margin: 0 0 1.5rem;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const IconBadge = styled.div`
  width: 2.1rem;
  height: 2.1rem;
  flex-shrink: 0;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
`;

interface RequirementsModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: () => void;
}

export const RequirementsModal = ({ open, onClose, onProceed }: RequirementsModalProps) => (
  <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
    <DialogContent>
      <DialogTitle>Before you apply</DialogTitle>
      <DialogDescription>Make sure you have the following ready.</DialogDescription>
      <List>
        {APPLICATION_REQUIREMENTS.map(({ icon: Icon, text }) => (
          <Item key={text}>
            <IconBadge>
              <Icon size={16} />
            </IconBadge>
            {text}
          </Item>
        ))}
      </List>
      <Button style={{ width: "100%" }} onClick={onProceed}>
        I'm Ready, Continue <ArrowRight size={16} />
      </Button>
    </DialogContent>
  </Dialog>
);
