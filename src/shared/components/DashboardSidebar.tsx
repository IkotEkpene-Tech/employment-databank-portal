import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { LayoutDashboard, FileText, LogOut, X } from "lucide-react";
import { useLogoutConfirm } from "@/shared/hooks";
import { LogoutConfirmModal } from "./LogoutConfirmModal";

const NAV_ITEMS = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard },
  { label: "Employment Registration", to: "/employment-registration", icon: FileText },
];

const Aside = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 260px;
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;
  z-index: ${({ theme }) => theme.zIndex.modal};
  transform: translateX(${({ $open }) => ($open ? "0" : "-100%")});
  transition: transform ${({ theme }) => theme.transitions.base};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    position: sticky;
    transform: none;
  }
`;

const Overlay = styled.button<{ $open: boolean }>`
  display: ${({ $open }) => ($open ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  z-index: ${({ theme }) => theme.zIndex.dropdown};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    display: none;
  }
`;

const BrandLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 1rem;
  color: #ffffff;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#0B4923" : "rgba(255,255,255,0.85)")};
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  margin-bottom: 0.25rem;

  &:hover {
    background: ${({ $active }) => ($active ? "#ffffff" : "rgba(255,255,255,0.1)")};
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

interface DashboardSidebarProps {
  open: boolean;
  onClose: () => void;
}

export const DashboardSidebar = ({ open, onClose }: DashboardSidebarProps) => {
  const location = useLocation();
  const { isOpen: isLogoutOpen, isLoggingOut, requestLogout, cancelLogout, confirmLogout } = useLogoutConfirm();

  return (
    <>
      <Overlay $open={open} onClick={onClose} aria-label="Close menu" />
      <Aside $open={open}>
        <BrandLink to="/dashboard">
          Employment Databank
          <X size={18} onClick={onClose} style={{ cursor: "pointer" }} />
        </BrandLink>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavItem key={item.to} to={item.to} $active={location.pathname === item.to}>
              <Icon size={17} />
              {item.label}
            </NavItem>
          );
        })}
        <LogoutButton onClick={requestLogout}>
          <LogOut size={17} />
          Log out
        </LogoutButton>
      </Aside>

      <LogoutConfirmModal
        open={isLogoutOpen}
        isLoggingOut={isLoggingOut}
        onCancel={cancelLogout}
        onConfirm={confirmLogout}
      />
    </>
  );
};
