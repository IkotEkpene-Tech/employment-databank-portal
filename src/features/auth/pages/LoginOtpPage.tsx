import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { Input, Button, OtpInput, toast } from "@/shared/ui";
import { requestLoginOtp } from "../api";
import { useAuth } from "../context/AuthContext";

const emailSchema = z.object({ email: z.string().email("Enter a valid email address") });
type EmailValues = z.infer<typeof emailSchema>;

const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "Enter the 6-digit code"),
});
type OtpValues = z.infer<typeof otpSchema>;

export const LoginOtpPage = () => {
  const { loginWithOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState<"request" | "verify">("request");
  const [email, setEmail] = useState("");

  const requestForm = useForm<EmailValues>({ resolver: zodResolver(emailSchema) });
  const otpForm = useForm<OtpValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email: "", otp: "" },
  });

  const handleRequest = async (values: EmailValues) => {
    try {
      await requestLoginOtp(values);
      setEmail(values.email);
      otpForm.setValue("email", values.email);
      setStage("verify");
      toast.success("A login code has been sent to your email");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send login code");
    }
  };

  const handleVerify = async (values: OtpValues) => {
    try {
      await loginWithOtp(values);
      const from = (location.state as { from?: Location })?.from as unknown as string | undefined;
      navigate(from || "/dashboard", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Invalid or expired code");
    }
  };

  if (stage === "verify") {
    return (
      <AuthLayout
        eyebrow="Check your email"
        title="Enter your login code"
        subtitle={`We sent a 6-digit code to ${email}.`}
        footer={
          <>
            <Link to="/login">Back to password login</Link>
          </>
        }
      >
        <form onSubmit={otpForm.handleSubmit(handleVerify)}>
          <FormField label="Login Code" required error={otpForm.formState.errors.otp?.message}>
            <Controller
              control={otpForm.control}
              name="otp"
              render={({ field }) => <OtpInput length={6} value={field.value} onChange={field.onChange} />}
            />
          </FormField>
          <Button type="submit" size="lg" style={{ width: "100%" }} disabled={otpForm.formState.isSubmitting}>
            {otpForm.formState.isSubmitting ? "Verifying..." : "Log In"}
          </Button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.8125rem" }}>
          <button
            type="button"
            onClick={() => setStage("request")}
            style={{ background: "none", border: "none", color: "#FE6301", fontWeight: 600, cursor: "pointer", padding: 0 }}
          >
            Use a different email
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      eyebrow="Passwordless login"
      title="Log in with a one-time code"
      subtitle="We'll email you a 6-digit code to log in."
      footer={
        <>
          <Link to="/login">Back to password login</Link>
        </>
      }
    >
      <form onSubmit={requestForm.handleSubmit(handleRequest)}>
        <FormField label="Email Address" required error={requestForm.formState.errors.email?.message}>
          <Input type="email" placeholder="example@email.com" {...requestForm.register("email")} />
        </FormField>
        <Button type="submit" size="lg" style={{ width: "100%" }} disabled={requestForm.formState.isSubmitting}>
          {requestForm.formState.isSubmitting ? "Sending..." : "Send Login Code"}
        </Button>
      </form>
    </AuthLayout>
  );
};
