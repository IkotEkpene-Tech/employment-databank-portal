import { useState } from "react";
import { ComplaintTrigger } from "./ComplaintTrigger";
import { ChoiceModal } from "./ChoiceModal";
import { ComplaintForm } from "./ComplaintForm";
import { LiveChatInterface } from "./LiveChatInterface";
import { StatusModal } from "./StatusModal";
import { MinimizedWidget } from "./MinimizedWidget";
import type { ComplaintMode, StatusModalState } from "./types";

const TITLES: Record<ComplaintMode, string> = {
  choice: "Help & Support",
  message: "Send a Message",
  chat: "Live Chat",
};

export const ComplaintWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ComplaintMode>("choice");
  const [isMinimized, setIsMinimized] = useState(false);
  const [statusModal, setStatusModal] = useState<StatusModalState>({
    open: false,
    title: "",
    message: "",
    type: "success",
  });

  const openWidget = () => {
    setIsOpen(true);
    setMode("choice");
    setIsMinimized(false);
  };

  const closeWidget = () => {
    setIsOpen(false);
    setMode("choice");
    setIsMinimized(false);
  };

  const closeStatusModal = () => setStatusModal((s) => ({ ...s, open: false }));

  const showSuccess = () =>
    setStatusModal({
      open: true,
      title: "Success",
      message: "Complaint submitted successfully. We will get back to you within 48 hours.",
      type: "success",
    });

  const showError = (message: string) =>
    setStatusModal({
      open: true,
      title: "Error",
      message: message || "An error occurred while submitting your complaint. Please try again.",
      type: "error",
    });

  if (isMinimized && isOpen) {
    return (
      <>
        <MinimizedWidget title={TITLES[mode]} onRestore={() => setIsMinimized(false)} onClose={closeWidget} />
        <StatusModal open={statusModal.open} onClose={closeStatusModal} title={statusModal.title} message={statusModal.message} type={statusModal.type} />
      </>
    );
  }

  return (
    <>
      <ComplaintTrigger onClick={openWidget} />

      {isOpen && mode === "choice" && (
        <ChoiceModal
          onClose={closeWidget}
          onMinimize={() => setIsMinimized(true)}
          onSelectMode={(next) => setMode(next)}
        />
      )}

      {isOpen && mode === "message" && (
        <ComplaintForm
          onClose={closeWidget}
          onBack={() => setMode("choice")}
          onMinimize={() => setIsMinimized(true)}
          onSuccess={showSuccess}
          onError={showError}
        />
      )}

      {isOpen && mode === "chat" && (
        <LiveChatInterface onClose={closeWidget} onBack={() => setMode("choice")} onMinimize={() => setIsMinimized(true)} />
      )}

      <StatusModal open={statusModal.open} onClose={closeStatusModal} title={statusModal.title} message={statusModal.message} type={statusModal.type} />
    </>
  );
};
