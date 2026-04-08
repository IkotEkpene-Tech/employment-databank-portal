"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { usePathname } from "next/navigation";
import { PageLoader } from "../components/PageLoader";

interface PageLoaderContextType {
  showLoader: (title?: string, subtitle?: string, fullScreen?: boolean) => void;
  hideLoader: () => void;
}

const PageLoaderContext = createContext<PageLoaderContextType | null>(null);

export const PageLoaderProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [subtitle, setSubtitle] = useState<string | undefined>(undefined);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  const showLoader = useCallback(
    (t?: string, s?: string, fullScreen?: boolean) => {
      setTitle(t);
      setSubtitle(s);
      setShowFullScreen(fullScreen || false);
      setVisible(true);
    },
    [],
  );

  const hideLoader = useCallback(() => {
    setVisible(false);
  }, []);

  return (
  <PageLoaderContext.Provider value={{ showLoader, hideLoader }}>
    {children}
    {visible && (
      <div className="fixed inset-0 z-50 bg-white/50 backdrop-blur-xs">
        <PageLoader
          fullScreen={showFullScreen}
          title={title}
          subtitle={subtitle}
        />
      </div>
    )}
  </PageLoaderContext.Provider>
);
};

export const usePageLoader = () => {
  const context = useContext(PageLoaderContext);
  if (!context) {
    throw new Error("usePageLoader must be used within a PageLoaderProvider");
  }
  return context;
};
