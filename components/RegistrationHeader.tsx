import Image from "next/image";

export const RegistrationHeader = () => {
  return (
    <header className="bg-[#00572f] text-white shadow-md">
      <div className="container max-w-5xl mx-auto px-4 py-6">
        
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Left: Main identity */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-center sm:text-left">
            <div className="relative flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#276844] flex items-center justify-center mx-auto sm:mx-0">
              <Image
                src="/logo/ik-logo-2.png"
                alt="Ikot Ekpene Local Government Logo"
                width={70}
                height={70}
                className="object-contain"
                priority
              />
            </div>

            <div>
              <h1 className="text-lg md:text-2xl font-semibold tracking-wide">
                Ikot Ekpene Local Government Area
              </h1>
              <p className="mt-1 text-sm md:text-base text-[#e6ebe8]">
                Indigene Employment Databank Registration Portal
              </p>
            </div>
          </div>

          {/* Right: Partner logos */}
          <div className="flex justify-center sm:justify-end gap-4">
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#276844] flex items-center justify-center">
              <Image
                src="/logo/akwa-ibom-logo-main.png"
                alt="Akwa Ibom State Government Logo"
                width={70}
                height={70}
                className="object-contain"
                priority
              />
            </div>

            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#276844] flex items-center justify-center">
              <Image
                src="/logo/arise-white.jpeg"
                alt="Arise Initiative Logo"
                width={64}
                height={64}
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>
      </div>

      <div className="h-1 bg-[#ec7913]" />
    </header>
  );
};
