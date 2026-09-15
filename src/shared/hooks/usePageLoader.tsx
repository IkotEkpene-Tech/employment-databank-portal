import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import styled from "styled-components";
import { Loader2 } from "lucide-react";

interface LoaderState {
  visible: boolean;
  title: string;
  subtitle: string;
  fullScreen: boolean;
}

interface PageLoaderContextValue {
  showLoader: (title: string, subtitle?: string, fullScreen?: boolean) => void;
  hideLoader: () => void;
}

const PageLoaderContext = createContext<PageLoaderContextValue | undefined>(undefined);

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
`;

const Spin = styled(Loader2)`
  animation: spin 1s linear infinite;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Title = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0;
`;

export const PageLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<LoaderState>({
    visible: false,
    title: "",
    subtitle: "",
    fullScreen: false,
  });

  const showLoader = useCallback(
    (title: string, subtitle = "", fullScreen = true) =>
      setState({ visible: true, title, subtitle, fullScreen }),
    [],
  );
  const hideLoader = useCallback(() => setState((s) => ({ ...s, visible: false })), []);

  const value = useMemo(() => ({ showLoader, hideLoader }), [showLoader, hideLoader]);

  return (
    <PageLoaderContext.Provider value={value}>
      {children}
      {state.visible && (
        <Overlay>
          <Spin size={40} />
          <Title>{state.title}</Title>
          {state.subtitle && <Subtitle>{state.subtitle}</Subtitle>}
        </Overlay>
      )}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => {
  const ctx = useContext(PageLoaderContext);
  if (!ctx) throw new Error("usePageLoader must be used within PageLoaderProvider");
  return ctx;
};
