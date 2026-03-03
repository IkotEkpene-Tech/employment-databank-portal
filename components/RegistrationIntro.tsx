import { Target, Users, Briefcase } from "lucide-react";

export const RegistrationIntro = () => {
  return (
    <div className="bg-[#FFFFFF] shadow-lg rounded-lg border p-6 mb-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-[#00572f] mb-3">
        Welcome to the Ikot Ekpene Employment Support Platform
      </h2>
      <p className="text-[#5c7166] mb-4">
        Under the Chairmanship of <strong>Hon. Elder Aniefiok Nkom</strong>,
        this platform is for Ikot Ekpene indigenes who are unemployed or seeking
        better job opportunities to register their details for support programs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-start gap-3 p-3 bg-[#eff1f0] rounded-lg">
          <div className="w-10 h-10 rounded-full bg-[#dae1dd] flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5 text-[#00572f]" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-[#112219]">
              Job Placement
            </h3>
            <p className="text-xs text-[#5c7166]">Connect with employers</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-[#eff1f0] rounded-lg">
          <div className="w-10 h-10 rounded-full bg-[#dae1dd] flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-[#00572f]" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-[#112219]">
              Skills Training
            </h3>
            <p className="text-xs text-[#5c7166]">Empowerment programs</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-[#eff1f0] rounded-lg">
          <div className="w-10 h-10 rounded-full bg-[#dae1dd] flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 h-5 text-[#00572f]" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-[#112219]">
              Opportunities
            </h3>
            <p className="text-xs text-[#5c7166]">Future empowerment</p>
          </div>
        </div>
      </div>
    </div>
  );
};
