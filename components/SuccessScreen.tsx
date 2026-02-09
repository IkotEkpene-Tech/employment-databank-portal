import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";

interface SuccessScreenProps {
  onReset: () => void;
}

export const SuccessScreen = ({ onReset }: SuccessScreenProps) => {
  return (
    <div className="min-h-[60vh] shadow-lg flex items-center justify-center animate-fade-in">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-[#ecf9f3] border-2 border-[#00572f] mx-auto mb-6 flex items-center justify-center animate-check-bounce">
          <CheckCircle2 className="w-10 h-10 text-[#00572f]" />
        </div>

        <h2 className="text-2xl font-bold text-[#112219] mb-3">
          Registration Successful!
        </h2>

        <p className="text-[#5c7166] mb-6">
          Thank you for registering with the Ikot Ekpene LGA Employment
          Databank. Your information has been recorded and you will be contacted
          for future job placement and empowerment opportunities.
        </p>

        <div className="bg-[#f4f6f5] rounded-lg p-4 mb-6">
          <p className="text-sm text-[#5c7166]">
            <strong className="text-[#112219]">What happens next?</strong>
            <br />
            Our team will verify your information and you may be contacted by
            village authorities for confirmation. Please ensure your phone is
            accessible.
          </p>
        </div>

        <Button onClick={onReset} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Register Another Person
        </Button>
      </div>
    </div>
  );
};
