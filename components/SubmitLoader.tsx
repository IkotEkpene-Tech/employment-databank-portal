"use client";
import { Loader2 } from "lucide-react";

export const SubmitLoader = () => {
  return (
    <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-9999 flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <Loader2 className="w-14 h-14 text-[#ec7913] animate-spin" />
        <div className="absolute inset-0 rounded-full border-2 border-[#ec7913] opacity-30 animate-ping" />
      </div>
      <div className="text-center">
        <h3 className="font-['DM_Sans'] text-lg font-semibold text-white mb-1">
          Submitting your application...
        </h3>
        <p className="font-['DM_Sans'] text-base text-white/75">
          Please wait, do not close this page.
        </p>
      </div>
    </div>
  );
};
