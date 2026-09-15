import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard } from "lucide-react";
import { FormField } from "@/features/auth/components/FormField";
import { Input, Button, toast } from "@/shared/ui";
import { config } from "@/shared/lib";
import { initiateAccessPayment } from "../api";

const schema = z.object({
  nin: z.string().regex(/^\d{11}$/, "NIN must be exactly 11 digits"),
});

type FormValues = z.infer<typeof schema>;

export const PayForAccessForm = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setIsRedirecting(true);
    try {
      const { authorizationUrl } = await initiateAccessPayment(values);
      window.location.href = authorizationUrl;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not start payment");
      setIsRedirecting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="National Identification Number (NIN)" required error={errors.nin?.message}>
        <Input inputMode="numeric" maxLength={11} placeholder="11-digit NIN" {...register("nin")} />
      </FormField>
      <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isRedirecting}>
        {isRedirecting ? (
          "Redirecting to payment..."
        ) : (
          <>
            <CreditCard size={16} /> Pay ₦{config.registrationFee} for Access Code
          </>
        )}
      </Button>
    </form>
  );
};
