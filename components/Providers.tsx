"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AlertProvider, Alerts } from "next-alert";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AlertProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Alerts position="top-left" direction="left" timer={6000} />
    </AlertProvider>
  );
}
