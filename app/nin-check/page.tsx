/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";
import { useRouter, useSearchParams } from "next/navigation";
import { AccessCodeInput } from "@/components/AccessCodeInput";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { NinInput } from "@/components/NinVerification";
import { formatPhoneNumber } from "@/utilities/utils";
import {
  useSaveApplicantNinData,
  useVerifyApplicantNin,
} from "@/services/tanstack";
import { Button } from "@/components/Button";

interface NinRecord {
  firstName: string;
  surname: string;
  otherName?: string;
  dob: string;
  gender: string;
  phone: string;
  stateOfOrigin: string;
}

const VerifyAccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accessCode, setAccessCode] = useState("");
  const [nin, setNin] = useState("");
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [isNinConfirmed, setIsNinConfirmed] = useState(false);
  const [ninRecord, setNinRecord] = useState<NinRecord | null | any>(null);
  const [verificationError, setVerificationError] = useState("");
  const phoneNumber = searchParams.get("phone") ?? "";

  const { mutate: verifyNin, isPending } = useVerifyApplicantNin();

  const { mutateAsync: saveNinData, isPending: isSavingNinData } = useSaveApplicantNinData();

  const handleCodeChange = (code: string, isValid: boolean) => {
    setAccessCode(code);
    setIsCodeComplete(isValid);
    setVerificationError("");
  };

  const handleNinChange = (
    nin: string,
    isValid: boolean,
    record?: NinRecord | any,
  ) => {
    setNin(nin);
    if (isValid && record) {
      setNinRecord(record);
      setIsNinConfirmed(true);
    } else {
      setNinRecord(null);
      setIsNinConfirmed(false);
    }
    setVerificationError("");
  };

  const handleVerifyNin = () => {
    if (!isCodeComplete) {
      setVerificationError("Please enter a valid 12-digit access code first");
      return;
    }

    setVerificationError("");

    verifyNin(
      { phoneNumber: formatPhoneNumber(phoneNumber), accessCode, nin },
      {
        onSuccess: (data) => {
          setNinRecord(data?.data);
          // console.log("NIN verification successful:", data);
        },
        onError: (error) => {
          setVerificationError(
            error.message || "Verification failed. Please try again.",
          );
        },
      },
    );
  };

  const handleProceed = () => {
    saveNinData(
      {
        firstname: ninRecord?.firstname,
        surname: ninRecord?.surname,
        middlename: ninRecord?.middlename || "",
        phoneNumber: formatPhoneNumber(phoneNumber),
        birthdate: ninRecord?.birthdate,
        photo: ninRecord?.photo,
        nin: ninRecord?.nin,
        accessCode,
      },
      {
        onSuccess: () => {
          if (ninRecord) {
            sessionStorage.setItem(
              "nin_verification_data",
              JSON.stringify({
                firstName: ninRecord.firstName,
                surname: ninRecord.surname,
                otherName: ninRecord.otherName,
                dob: ninRecord.dob,
                gender: ninRecord.gender,
                phone: ninRecord.phone,
                stateOfOrigin: ninRecord.stateOfOrigin,
              }),
            );
          }
          router.push(`/registration?nin=${nin}&code=${accessCode}`);
        },
        onError: (error) => {
          console.error("Error saving NIN data:", error);
          setVerificationError(
            error.message || "Nin verification failed. Please try again.",
          );
        },
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-9">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider mb-4 bg-white border border-[#d0e6da] text-[#00572f]">
              <span className="w-2 h-2 rounded-full bg-[#00572f] animate-pulse" />
              Ikot Ekpene LGA — Employment Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-['Playfair_Display'] text-[#0d2b1c] leading-tight">
              Verify Your Access
            </h1>
            <p className="text-sm max-w-sm mx-auto leading-relaxed text-[#5c7a69]">
              Enter your access code and NIN to continue with registration
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden bg-white border border-[#ddeee5] shadow-lg">
            <div className="flex items-center gap-3 px-6 py-5 border-b bg-linear-to-br from-[#f5f9f6] to-[#edf4ef] border-[#e0ebe4]">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-linear-to-br from-[#00572f] to-[#007a44] shadow-md">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[17px] font-bold font-['Playfair_Display'] text-[#00572f]">
                  Verification Required
                </p>
                <p className="text-xs text-[#6b8a78]">
                  Enter both your access code and NIN
                </p>
              </div>
            </div>

            <div className="px-6 py-7 space-y-6">
              {phoneNumber && (
                <div className="bg-[#f8fbf9] rounded-xl p-3 border border-[#e0ebe4] mb-6">
                  <div className="font-['DM_Sans'] text-[11px] font-semibold text-[#8aab98] uppercase mb-1">
                    Registered Phone Number
                  </div>
                  <div className="font-['DM_Sans'] text-base font-semibold text-[#00572f]">
                    {formatPhoneNumber(phoneNumber)}
                  </div>
                </div>
              )}

              <AccessCodeInput onChange={handleCodeChange} />

              <NinInput
                onChange={handleNinChange}
                isVerifying={isPending || isSavingNinData}
                ninRecord={ninRecord}
                verificationError={verificationError}
                onVerify={handleVerifyNin}
              />

              {verificationError && (
                <div className="flex items-center gap-1.5 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#ef4343]" />
                  <p className="text-xs text-[#ef4343]">{verificationError}</p>
                </div>
              )}

              {isNinConfirmed && (
                <Button
                  onClick={handleProceed}
                  className="w-full py-3.5 cursor-pointer rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors font-['DM_Sans']"
                  style={{ background: "#ec7913", color: "#fff" }}
                  disabled={isPending || isSavingNinData}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Continue to Registration
                </Button>
              )}

              <div className="flex gap-2.5 rounded-xl p-3 bg-[#f0f8f4] border border-[#c8e4d4]">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold bg-[#00572f] text-white">
                  i
                </div>
                <p className="text-xs leading-relaxed text-[#3d6b52]">
                  Your access code was sent to you after successful payment.
                  Your NIN is your 11-digit National Identification Number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VerifyAccessPage;
