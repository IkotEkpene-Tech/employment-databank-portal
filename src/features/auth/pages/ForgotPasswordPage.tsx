import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MailCheck } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { Input, Button, toast } from "@/shared/ui";
import { forgotPassword } from "../api";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      await forgotPassword(values);
      setSent(true);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  if (sent) {
    return (
      <AuthLayout title="Check your email">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <MailCheck size={48} color="#0B4923" />
        </div>
        <p style={{ textAlign: "center", color: "#677E76" }}>
          If an account exists for that email, a password reset link is on its way.
        </p>
        <Button asChild style={{ width: "100%" }}>
          <Link to="/login">Back to login</Link>
        </Button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <>
          <Link to="/login">Back to login</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Email Address" required error={errors.email?.message}>
          <Input type="email" placeholder="example@email.com" {...register("email")} />
        </FormField>
        <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </AuthLayout>
  );
};
