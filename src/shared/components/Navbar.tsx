import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Button } from "@/shared/ui";

const ikLogo = "/logo/ik-logo-2.png";

const NAV_HEIGHT = "4.5rem";

const solidBg = css`
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  border-bottom: 1px solid ${({ theme }) => theme.alpha(theme.colors.highlight, 0.25)};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const Bar = styled.header<{ $variant: "solid" | "overlay"; $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.navbar};
  min-height: ${NAV_HEIGHT};
  display: flex;
  align-items: center;
  transition: background ${({ theme }) => theme.transitions.base},
    box-shadow ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  ${({ $variant, $scrolled }) =>
    $variant === "solid" || $scrolled
      ? solidBg
      : css`
          background: linear-gradient(180deg, rgba(4, 18, 12, 0.55) 0%, rgba(4, 18, 12, 0) 100%);
          border-bottom: 1px solid transparent;
        `}
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const Logo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.highlightMuted, 0.4)};
`;

const BrandText = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 0.95rem;
  color: #ffffff;
  line-height: 1.2;
`;

const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  gap: 0.25rem;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    display: flex;
  }
`;

const NavLink = styled(Link)<{ $active?: boolean }>`
  padding: 0.5rem 0.85rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "#ffffff" : "rgba(255,255,255,0.8)")};
  background: ${({ theme, $active }) => ($active ? theme.alpha(theme.colors.navHover, 0.35) : "transparent")};
  border-bottom: 2px solid ${({ theme, $active }) => ($active ? theme.colors.highlight : "transparent")};

  &:hover {
    color: #ffffff;
    background: ${({ theme }) => theme.alpha(theme.colors.navHover, 0.35)};
  }
`;

const Actions = styled.div`
  display: none;
  align-items: center;
  gap: 0.75rem;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    display: flex;
  }
`;

const MobileToggle = styled.button`
  display: inline-flex;
  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    display: none;
  }
  background: transparent;
  border: none;
  color: #ffffff;
  cursor: pointer;
`;

const MobileMenu = styled.div`
  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    display: none;
  }
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  border-top: 1px solid ${({ theme }) => theme.alpha(theme.colors.highlight, 0.25)};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 0.5rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

interface NavbarProps {
  variant?: "solid" | "overlay";
}

export const Navbar = ({ variant = "solid" }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/#requirements", label: "Requirements" },
    { to: "/#about", label: "About" },
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms & Conditions" },
  ];

  return (
    <Bar $variant={variant} $scrolled={scrolled}>
      <Inner>
        <Brand to="/">
          <Logo src={ikLogo} alt="Ikot Ekpene LGA logo" />
          <BrandText>
            Ikot Ekpene LGA
            <br />
            Employment Databank
          </BrandText>
        </Brand>

        <DesktopNav>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} $active={location.pathname === link.to}>
              {link.label}
            </NavLink>
          ))}
        </DesktopNav>

        <Actions>
          {isAuthenticated ? (
            <>
              <Button asChild variant="outline" size="sm" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button size="sm" variant="secondary" onClick={handleLogout}>
                <LogOut size={15} /> Log out
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm" variant="secondary">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </Actions>

        <MobileToggle onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </MobileToggle>

        {open && (
          <MobileMenu>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink
                  to={location.pathname}
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                >
                  Log out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setOpen(false)}>
                  Log in
                </NavLink>
                <NavLink to="/register" onClick={() => setOpen(false)}>
                  Register
                </NavLink>
              </>
            )}
          </MobileMenu>
        )}
      </Inner>
    </Bar>
  );
};

export { NAV_HEIGHT };
