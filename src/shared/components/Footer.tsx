import { Link } from "react-router-dom";
import styled from "styled-components";
import { ShieldCheck, Lock, Users, Sparkles, MessageCircleMore } from "lucide-react";
import { ScrollToTopButton } from "./ScrollToTopButton";

const FooterEl = styled.footer`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.gradients.footer};
  color: rgba(255, 255, 255, 0.75);
  padding: 4rem 1.25rem 1.75rem;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.alpha(theme.colors.highlight, 0.15)};

  background-image: radial-gradient(1.5px 1.5px at 12% 22%, rgba(255, 255, 255, 0.18) 100%, transparent),
    radial-gradient(1.5px 1.5px at 32% 68%, rgba(255, 255, 255, 0.14) 100%, transparent),
    radial-gradient(2px 2px at 58% 15%, rgba(255, 255, 255, 0.12) 100%, transparent),
    radial-gradient(1.5px 1.5px at 74% 78%, rgba(255, 255, 255, 0.16) 100%, transparent),
    radial-gradient(2px 2px at 90% 35%, rgba(255, 255, 255, 0.1) 100%, transparent),
    ${({ theme }) => theme.gradients.footer};
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  margin-bottom: 2.5rem;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.md})`} {
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
  }
`;

const BrandCol = styled.div``;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
`;

const LogoImg = styled.img`
  width: 2.75rem;
  height: 2.75rem;
  object-fit: contain;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  padding: 0.25rem;
`;

const OrgName = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  font-size: 1rem;
  color: #ffffff;
  margin: 0 0 0.35rem;
`;

const OrgSub = styled.p`
  font-size: 0.8125rem;
  line-height: 1.6;
  opacity: 0.65;
  margin: 0 0 1rem;
`;

const BadgeRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Badge = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  color: ${({ theme }) => theme.colors.highlightMuted};
`;

const Note = styled.div`
  border: 1px solid ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.4)};
  background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.1)};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 0.9rem 1.1rem;
  font-size: 0.78125rem;
  line-height: 1.55;
  max-width: 20rem;

  strong {
    color: #ffffff;
  }

  a {
    color: ${({ theme }) => theme.colors.highlightMuted};
    font-weight: 600;
    text-decoration: underline;
  }
`;

const ColTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9375rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem;

  &::before {
    content: "";
    width: 3px;
    height: 1.1rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  }
`;

const ColLinks = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
`;

const ColLink = styled(Link)`
  font-size: 0.8125rem;
  opacity: 0.75;

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.highlightMuted};
  }
`;

const HelpRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.8125rem;
  opacity: 0.75;
  line-height: 1.55;
`;

const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.alpha(theme.colors.navHover, 0.4)};
  margin-bottom: 1.25rem;
`;

const BottomBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  opacity: 0.6;
`;

export const Footer = () => (
  <FooterEl>
    <Inner>
      <Grid>
        <BrandCol>
          <LogoRow>
            <LogoImg src="/logo/ik-logo-2.png" alt="Ikot Ekpene LGA logo" />
            <LogoImg src="/logo/akwa-ibom-logo-main.png" alt="Akwa Ibom State Government logo" />
          </LogoRow>
          <OrgName>Ikot Ekpene Local Government Area</OrgName>
          <OrgSub>
            Employment Databank Portal
            <br />
            Chairmanship of Hon. (Eld) Aniefiok Nkom
          </OrgSub>
          <BadgeRow>
            <Badge title="NIN Verified"><ShieldCheck size={15} /></Badge>
            <Badge title="Secure"><Lock size={15} /></Badge>
            <Badge title="Indigene Access"><Users size={15} /></Badge>
            <Badge title="Skills & Empowerment"><Sparkles size={15} /></Badge>
          </BadgeRow>
          <Note>
            <strong>Note:</strong> applying for employment requires a valid NIN and a one-time ₦500
            access-code fee. See our <Link to="/terms">Terms &amp; Conditions</Link> before you begin.
          </Note>
        </BrandCol>

        <div>
          <ColTitle>The Programme</ColTitle>
          <ColLinks>
            <ColLink to="/">Home</ColLink>
            <ColLink to="/#about">About</ColLink>
            <ColLink to="/#requirements">Requirements</ColLink>
            <ColLink to="/register">Register</ColLink>
          </ColLinks>
        </div>

        <div>
          <ColTitle>Account</ColTitle>
          <ColLinks>
            <ColLink to="/login">Log In</ColLink>
            <ColLink to="/login/otp">Log In with a Code</ColLink>
            <ColLink to="/forgot-password">Forgot Password</ColLink>
            <ColLink to="/dashboard">Dashboard</ColLink>
          </ColLinks>
        </div>

        <div>
          <ColTitle>Legal & Help</ColTitle>
          <ColLinks>
            <ColLink to="/privacy">Privacy Policy</ColLink>
            <ColLink to="/terms">Terms &amp; Conditions</ColLink>
          </ColLinks>
          <HelpRow style={{ marginTop: "1rem" }}>
            <MessageCircleMore size={16} style={{ flexShrink: 0, marginTop: "0.1rem" }} />
            Need help? Use the complaint icon in the corner of this page to reach support.
          </HelpRow>
        </div>
      </Grid>

      <Divider />

      <BottomBar>
        <span>© {new Date().getFullYear()} Ikot Ekpene Local Government Area. All rights reserved.</span>
        <span>Official Employment Databank Registration Portal</span>
      </BottomBar>
    </Inner>

    <ScrollToTopButton />
  </FooterEl>
);
