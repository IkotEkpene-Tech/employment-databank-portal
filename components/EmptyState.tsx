"use client";

import { SearchX, Database, MapPin } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

export const EmptyState = ({
  title = "No Data Available",
  description = "There is currently no information to display.",
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      {/* Animated Icon Container */}
      <div className="relative">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#f4f7f6]">
          {icon ?? (
            <Database className="w-10 h-10 text-[#ec7913] animate-bounce" />
          )}
        </div>

        {/* Soft Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-[#ec7913] opacity-10 blur-xl animate-pulse" />
      </div>

      <h3 className="mt-6 text-lg font-semibold text-[#00572f]">{title}</h3>

      <p className="mt-2 text-sm text-[#5c7166] max-w-md">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};
