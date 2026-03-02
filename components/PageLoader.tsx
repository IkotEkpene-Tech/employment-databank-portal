"use client";

import { Loader2 } from "lucide-react";

interface PageLoaderProps {
  title?: string;
  subtitle?: string;
  fullScreen?: boolean;
}

export const PageLoader = ({
  title = "Loading data...",
  subtitle = "Please wait while we fetch the required information.",
  fullScreen = false,
}: PageLoaderProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center px-6 ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      {/* Animated Spinner */}
      <div className="relative">
        <Loader2 className="w-12 h-12 text-[#ec7913] animate-spin" />

        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#ec7913] animate-ping opacity-30" />
      </div>

      {/* Text */}
      <h3 className="mt-6 text-lg font-semibold text-[#00572f]">{title}</h3>

      <p className="mt-2 text-sm text-[#5c7166] max-w-md">{subtitle}</p>
    </div>
  );
};
