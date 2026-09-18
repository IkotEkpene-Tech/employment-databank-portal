import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/context/AuthContext";
import { toast } from "@/shared/ui";

export const useLogoutConfirm = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const requestLogout = () => setIsOpen(true);
  const cancelLogout = () => {
    if (isLoggingOut) return;
    setIsOpen(false);
  };

  const confirmLogout = async () => {
    setIsLoggingOut(true);
    const firstName = user?.firstName ?? "";
    try {
      await logout();
      toast.success(`Goodbye${firstName ? ` ${firstName}` : ""}`);
      navigate("/login");
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  return { isOpen, isLoggingOut, requestLogout, cancelLogout, confirmLogout };
};
