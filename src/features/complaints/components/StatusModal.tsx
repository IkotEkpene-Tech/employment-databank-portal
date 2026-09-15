import { CheckCircle, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, Button } from "@/shared/ui";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error";
}

export const StatusModal = ({ open, onClose, title, message, type }: Props) => (
  <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
    <DialogContent>
      <div style={{ textAlign: "center", padding: "1rem 0" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
          {type === "success" ? <CheckCircle size={48} color="#0B4923" /> : <AlertCircle size={48} color="#EF4444" />}
        </div>
        <DialogTitle style={{ textAlign: "center" }}>{title}</DialogTitle>
        <p style={{ fontSize: "0.875rem", color: "#5a7a6b" }}>{message}</p>
        <Button onClick={onClose} style={{ width: "100%", marginTop: "1rem" }}>
          Close
        </Button>
      </div>
    </DialogContent>
  </Dialog>
);
