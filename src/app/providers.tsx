import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import { theme, GlobalStyle } from "@/theme";
import { queryClient } from "@/shared/lib";
import { Toaster } from "@/shared/ui";
import { PageLoaderProvider } from "@/shared/hooks";
import { AuthProvider } from "@/features/auth/context/AuthContext";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PageLoaderProvider>
          <Toaster />
          {children}
        </PageLoaderProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);
