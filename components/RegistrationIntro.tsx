import { Target, Users, Briefcase } from "lucide-react";

const features = [
  {
    icon: <Target className="w-4 h-4 text-white" />,
    title: "Get a Job",
    desc: "We will connect you with employers who are hiring in your area.",
  },
  {
    icon: <Users className="w-4 h-4 text-white" />,
    title: "Learn New Skills",
    desc: "Join free training programmes to help you do better work.",
  },
  {
    icon: <Briefcase className="w-4 h-4 text-white" />,
    title: "More Opportunities",
    desc: "Be first to hear about government support and work schemes.",
  },
];

export const RegistrationIntro = () => {
  return (
    <div className="mb-6 bg-white rounded-2xl border border-[#e4ede8] shadow-sm overflow-hidden">
      {/* Top accent bar */}
      <div className="h-0.75 bg-linear-to-r from-[#00572f] via-[#007a44] to-[#ec7913]" />

      <div className="px-6 py-6">
        {/* Heading */}
        <div className="mb-3">
          <p className="font-['DM_Sans'] text-[11px] font-semibold text-[#ec7913] tracking-[0.12em] uppercase mb-1.5">
            Ikot Ekpene LGA — Chairman Hon. Elder Aniefiok Nkom
          </p>
          <h2 className="font-['Playfair_Display'] text-[clamp(17px,2.8vw,21px)] font-bold text-[#00572f] leading-snug">
            We want to help you build a future
          </h2>
        </div>

        {/* Body text */}
        <p className="font-['DM_Sans'] text-sm text-[#4a6355] leading-relaxed mb-6">
          If you live in Ikot Ekpene and you need a job — or you want a better
          one — this is for you. Fill in your details below. Our office will use
          your information to find the right support, training, or job
          opportunity for you. It is{" "}
          <strong className="text-[#1a3d2b]">free</strong>, and it only takes a
          few minutes.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 p-3.5 bg-[#f5f9f6] border border-[#deeae3] rounded-xl hover:shadow-md hover:border-[#b3d4c1] transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#00572f] to-[#007a44] flex items-center justify-center shrink-0 shadow-md">
                {icon}
              </div>
              <div>
                <h3 className="font-['DM_Sans'] text-sm font-semibold text-[#0f2e1c] mb-0.5">
                  {title}
                </h3>
                <p className="font-['DM_Sans'] text-xs text-[#5c7166] leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
