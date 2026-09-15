import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { Button, OtpInput, toast } from "@/shared/ui";
import { verifyEmailOtp, resendEmailOtp } from "../api";

const schema = z.object({
  otp: z.string().length(6, "Enter the 6-digit code"),
});

type FormValues = z.infer<typeof schema>;

const maskEmail = (email: string) => {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  if (local.length <= 2) return `${local[0]}*****@${domain}`;
  return `${local[0]}*****${local[local.length - 1]}@${domain}`;
};

export const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string } | null)?.email ?? "";
  const [isResending, setIsResending] = useState(false);
  const [verified, setVerified] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { otp: "" },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await verifyEmailOtp({ email, ...values });
      setVerified(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid or expired code");
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendEmailOtp({ email });
      toast.success("A new verification code has been sent to your email");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not resend code");
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <AuthLayout title="We couldn't find your email">
        <p style={{ textAlign: "center", color: "#677E76" }}>
          Please register or log in again to receive a new verification code.
        </p>
        <Button style={{ width: "100%" }} onClick={() => navigate("/register")}>
          Back to Register
        </Button>
      </AuthLayout>
    );
  }

  if (verified) {
    return (
      <AuthLayout title="Email verified">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <CheckCircle2 size={48} color="#0B4923" />
        </div>
        <p style={{ textAlign: "center", color: "#677E76" }}>
          Your email has been confirmed. You can now log in with your password.
        </p>
        <Button style={{ width: "100%" }} onClick={() => navigate("/login")}>
          Continue to Log In
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      eyebrow="One last step"
      title="Confirm your email"
      subtitle={`An email has been sent to ${maskEmail(email)}.`}
      footer={
        <>
          Wrong email? <Link to="/register">Register again</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Verification Code" required error={errors.otp?.message}>
          <Controller
            control={control}
            name="otp"
            render={({ field }) => <OtpInput length={6} value={field.value} onChange={field.onChange} />}
          />
        </FormField>

        <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </Button>
      </form>

      <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.8125rem" }}>
        Didn&apos;t get a code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          style={{ background: "none", border: "none", color: "#FE6301", fontWeight: 600, cursor: "pointer", padding: 0 }}
        >
          {isResending ? "Sending..." : "Resend code"}
        </button>
      </div>
    </AuthLayout>
  );
};
