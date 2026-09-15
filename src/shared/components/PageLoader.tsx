import styled from "styled-components";
import { Loader2 } from "lucide-react";

const Wrap = styled.div<{ $fullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  ${({ $fullScreen }) => $fullScreen && `min-height: 100vh;`}
`;

const Spin = styled(Loader2)`
  animation: spin 1s linear infinite;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Title = styled.p`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0;
`;

interface PageLoaderProps {
  title?: string;
  subtitle?: string;
  fullScreen?: boolean;
}

export const PageLoader = ({ title = "Loading...", subtitle, fullScreen }: PageLoaderProps) => (
  <Wrap $fullScreen={fullScreen}>
    <Spin size={32} />
    <Title>{title}</Title>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </Wrap>
);
