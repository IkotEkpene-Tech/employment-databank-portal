import Image from "next/image";

export const RegistrationHeader = () => {
  return (
    <header className="relative overflow-hidden bg-linear-to-br from-[#003d20] via-[#00572f] to-[#006b39]">
      {/* Subtle geometric background pattern */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.04)_0%,transparent_60%),radial-gradient(circle_at_10%_80%,rgba(0,0,0,0.1)_0%,transparent_50%)]" />

      {/* Header inner container */}
      <div className="relative z-10 max-w-275 mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Identity */}
        <div className="flex items-center gap-3.5">
          <div className="shrink-0 w-15 h-15 rounded-full bg-white/12 border border-white/25 flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
            <Image
              src="/logo/ik-logo-2.png"
              alt="Ikot Ekpene Local Government Logo"
              width={44}
              height={44}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="font-['Playfair_Display'] text-[clamp(15px,2.4vw,20px)] font-bold text-white leading-tight tracking-wide">
              Ikot Ekpene Local Government Area
            </h1>
            <p className="font-['DM_Sans'] text-[clamp(11px,1.5vw,13px)] text-white/65 tracking-wider uppercase font-medium mt-1">
              Job &amp; Support Registration Portal
            </p>
          </div>
        </div>

        {/* Vertical divider - hidden on mobile */}
        <div className="hidden sm:block w-px h-12 bg-white/15 shrink-0" />

        {/* Right: Partner logos */}
        <div className="flex items-center gap-2.5 justify-start sm:justify-end">
          <span className="font-['DM_Sans'] text-[10px] text-white/45 uppercase tracking-widest mr-1 whitespace-nowrap">
            In partnership with
          </span>

          <div
            className="w-11.5 h-11.5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-md transition-all duration-200 hover:bg-white/18 hover:border-white/40"
            title="Akwa Ibom State Government"
          >
            <Image
              src="/logo/akwa-ibom-logo-main.png"
              alt="Akwa Ibom State Government Logo"
              width={34}
              height={34}
              className="object-contain"
              priority
            />
          </div>

          <div
            className="w-11.5 h-11.5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-md transition-all duration-200 hover:bg-white/18 hover:border-white/40"
            title="Arise Initiative"
          >
            <Image
              src="/logo/arise-white.jpeg"
              alt="Arise Initiative Logo"
              width={30}
              height={30}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>

      {/* Shimmer accent bar */}
      <div className="h-0.5 bg-linear-to-r from-[#ec7913] via-[#f5a64d] to-[#ec7913] bg-size-[200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />

      {/* Add custom keyframes for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
        }
      `}</style>
    </header>
  );
};
