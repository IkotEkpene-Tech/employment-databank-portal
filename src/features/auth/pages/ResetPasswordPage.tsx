import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { PasswordInput, Button, toast } from "@/shared/ui";
import { resetPassword } from "../api";

const schema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (!token) {
    return (
      <AuthLayout title="Link expired or invalid">
        <p style={{ textAlign: "center", color: "#677E76" }}>
          This password reset link is invalid or has expired.
        </p>
        <Button asChild style={{ width: "100%" }}>
          <Link to="/forgot-password">Request a new link</Link>
        </Button>
      </AuthLayout>
    );
  }

  const onSubmit = async (values: FormValues) => {
    try {
      await resetPassword({ token, password: values.password });
      toast.success("Password reset successfully. Please log in.");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not reset password");
    }
  };

  return (
    <AuthLayout title="Set a new password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="New Password" required error={errors.password?.message}>
          <PasswordInput placeholder="At least 6 characters" {...register("password")} />
        </FormField>
        <FormField label="Confirm Password" required error={errors.confirmPassword?.message}>
          <PasswordInput placeholder="Re-enter your password" {...register("confirmPassword")} />
        </FormField>
        <Button type="submit" size="lg" style={{ width: "100%" }} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Reset Password"}
        </Button>
      </form>
    </AuthLayout>
  );
};
