import { ReactNode } from "react";
import styled from "styled-components";
import { Navbar, NAV_HEIGHT } from "./Navbar";
import { Footer } from "./Footer";

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main<{ $offsetTop: boolean }>`
  flex: 1;
  padding-top: ${({ $offsetTop }) => ($offsetTop ? NAV_HEIGHT : "0")};
`;

interface PageShellProps {
  children: ReactNode;
  navVariant?: "solid" | "overlay";
}

export const PageShell = ({ children, navVariant = "solid" }: PageShellProps) => (
  <Shell>
    <Navbar variant={navVariant} />
    <Main $offsetTop={navVariant === "solid"}>{children}</Main>
    <Footer />
  </Shell>
);
