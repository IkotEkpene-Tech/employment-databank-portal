// app/layout.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import { RegistrationHeader } from "@/components/RegistrationHeader";
import { PageLoaderProvider } from "@/contexts/useLoader";
import PhoneGuard from "@/hooks/PhoneGuard";
import { ComplaintWidget } from "@/components/ComplaintWidget";

export const metadata: Metadata = {
  title: "Ikot Ekpene Local Government Indigene Employment Databank Registration Portal",
  description: "Ikot Ekpene Local Government Indigene Employment Databank Registration Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PageLoaderProvider>
            <Suspense fallback={null}>
              <PhoneGuard>
                <RegistrationHeader />
                {children}
              </PhoneGuard>
               <ComplaintWidget />
            </Suspense>
          </PageLoaderProvider>
        </Providers>
      </body>
    </html>
  );
}