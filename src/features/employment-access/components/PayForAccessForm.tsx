import { useState } from "react";
import styled from "styled-components";
import { CreditCard } from "lucide-react";
import { Button, toast } from "@/shared/ui";
import { config } from "@/shared/lib";
import { initiateAccessPayment } from "../api";

const Perks = styled.ul`
  margin: 0 0 1.5rem;
  padding-left: 1.1rem;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const PayForAccessForm = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handlePay = async () => {
    setIsRedirecting(true);
    try {
      const { authorizationUrl } = await initiateAccessPayment();
      window.location.href = authorizationUrl;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not start payment");
      setIsRedirecting(false);
    }
  };

  return (
    <div>
      <Perks>
        <li>Your access code is sent to your account email and valid for 72 hours.</li>
        <li>It allows 4 NIN verification attempts — each NIN you submit uses one, even a wrong one.</li>
        <li>You&apos;ll enter your NIN after payment, when you start your application.</li>
      </Perks>
      <Button type="button" size="lg" style={{ width: "100%" }} disabled={isRedirecting} onClick={handlePay}>
        {isRedirecting ? (
          "Redirecting to payment..."
        ) : (
          <>
            <CreditCard size={16} /> Pay ₦{config.registrationFee} for Access Code
          </>
        )}
      </Button>
    </div>
  );
};
