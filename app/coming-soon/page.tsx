/* eslint-disable react/no-unescaped-entities */
"use client";
import { Wrench, Clock } from "lucide-react";

const ComingSoonPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] px-6">
      {/* Logo / Icon */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-linear-to-br from-[#00572f] to-[#007a44] rounded-full flex items-center justify-center shadow-xl">
          <Wrench className="w-10 h-10 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 bg-[#ec7913] rounded-full flex items-center justify-center shadow-md">
          <Clock className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Title */}
      <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#00572f] text-center mb-3">
        Site Under Maintenance
      </h1>

      {/* Divider */}
      <div className="w-16 h-1 bg-[#ec7913] rounded-full mb-6" />

      {/* Message */}
      <p className="font-['DM_Sans'] text-base text-[#5c7166] text-center max-w-md leading-relaxed mb-3">
        The Ikot Ekpene LGA Employment Portal is currently undergoing scheduled
        maintenance to serve you better.
      </p>
      <p className="font-['DM_Sans'] text-sm text-[#8aab98] text-center max-w-sm leading-relaxed">
        We apologize for the inconvenience. Please check back shortly — we'll be
        back online soon.
      </p>

      {/* Animated dots */}
      <div className="flex items-center gap-2 mt-10">
        <span className="w-2.5 h-2.5 bg-[#00572f] rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2.5 h-2.5 bg-[#00572f] rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2.5 h-2.5 bg-[#00572f] rounded-full animate-bounce [animation-delay:300ms]" />
      </div>

      {/* Footer note */}
      <p className="font-['DM_Sans'] text-xs text-[#b0c4b8] text-center mt-16">
        © {new Date().getFullYear()} Ikot Ekpene LGA — All rights reserved
      </p>
    </div>
  );
};

export default ComingSoonPage;
