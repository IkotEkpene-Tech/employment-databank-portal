import styled from "styled-components";
import { Menu } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Avatar, AvatarFallback } from "@/shared/ui";

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  background: #ffffff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MenuToggle = styled.button`
  display: inline-flex;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    display: none;
  }
`;

const Title = styled.h1`
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0;
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  display: none;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.sm})`} {
    display: inline;
  }
`;

const UserCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

interface DashboardTopbarProps {
  title: string;
  onMenuClick: () => void;
}

export const DashboardTopbar = ({ title, onMenuClick }: DashboardTopbarProps) => {
  const { user } = useAuth();
  const displayName = user?.firstName && user?.surname ? `${user.firstName} ${user.surname}` : user?.email;
  const initials = user?.firstName && user?.surname
    ? `${user.firstName[0]}${user.surname[0]}`.toUpperCase()
    : user?.email
      ? user.email[0].toUpperCase()
      : "?";

  return (
    <Bar>
      <MenuToggle onClick={onMenuClick} aria-label="Open menu">
        <Menu size={22} />
      </MenuToggle>
      <Title>{title}</Title>
      <UserCluster>
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <UserName>{displayName}</UserName>
      </UserCluster>
    </Bar>
  );
};
