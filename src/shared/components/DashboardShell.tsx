import { ReactNode, useState } from "react";
import styled from "styled-components";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
`;

const ContentPane = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const ContentBody = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

interface DashboardShellProps {
  title: string;
  children: ReactNode;
}

export const DashboardShell = ({ title, children }: DashboardShellProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Layout>
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ContentPane>
        <DashboardTopbar title={title} onMenuClick={() => setSidebarOpen(true)} />
        <ContentBody>{children}</ContentBody>
      </ContentPane>
    </Layout>
  );
};
