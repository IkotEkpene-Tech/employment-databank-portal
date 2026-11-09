import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { FormField } from "@/features/auth/components/FormField";
import { Input, OtpInput, Button } from "@/shared/ui";

const schema = z.object({
  nin: z.string().regex(/^\d{11}$/, "NIN must be exactly 11 digits"),
  accessCode: z.string().length(8, "Access code must be 8 characters"),
});

export type AccessCodeGateValues = z.infer<typeof schema>;

interface AccessCodeGateFormProps {
  onSubmit: (values: AccessCodeGateValues) => unknown;
  isSubmitting?: boolean;
  defaultNin?: string;
  defaultAccessCode?: string;
  trialsRemaining?: number;
}

export const AccessCodeGateForm = ({
  onSubmit,
  isSubmitting,
  defaultNin = "",
  defaultAccessCode = "",
  trialsRemaining,
}: AccessCodeGateFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AccessCodeGateValues>({
    resolver: zodResolver(schema),
    defaultValues: { nin: defaultNin, accessCode: defaultAccessCode },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="National Identification Number (NIN)" required error={errors.nin?.message}>
        <Input inputMode="numeric" maxLength={11} placeholder="11-digit NIN" {...register("nin")} />
      </FormField>
      <FormField label="Access Code" required error={errors.accessCode?.message}>
        <Controller
          control={control}
          name="accessCode"
          render={({ field }) => <OtpInput length={8} value={field.value} onChange={field.onChange} />}
        />
      </FormField>
      {trialsRemaining !== undefined && (
        <p style={{ fontSize: "0.8125rem", margin: "0 0 1rem", color: trialsRemaining === 0 ? "#EF4444" : "inherit" }}>
          {trialsRemaining === 0
            ? "You have no verification attempts left on this access code."
            : `Double-check your NIN — each submission uses one of your ${trialsRemaining} remaining attempt${trialsRemaining === 1 ? "" : "s"}.`}
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        style={{ width: "100%" }}
        disabled={isSubmitting || trialsRemaining === 0}
      >
        {isSubmitting ? "Verifying..." : <>Verify &amp; Continue <ArrowRight size={16} /></>}
      </Button>
    </form>
  );
};
