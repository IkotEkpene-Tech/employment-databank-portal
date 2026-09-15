import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { AuthLayout } from "../components/AuthLayout";
import { FormField } from "../components/FormField";
import { Input, PasswordInput, Button, toast } from "@/shared/ui";
import { registerAccount } from "../api";

const schema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    phone: z
      .string()
      .regex(
        /^0[0-9]{10}$/,
        "Enter a valid 11-digit phone number starting with 0",
      ),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    try {
      const { email } = await registerAccount({
        email: values.email,
        password: values.password,
        phone: values.phone,
      });
      navigate("/verify-email", { state: { email } });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register with your email and phone number to get started."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Email Address" required error={errors.email?.message}>
          <Input
            type="email"
            placeholder="example@email.com"
            {...register("email")}
          />
        </FormField>
        <FormField label="Phone Number" required error={errors.phone?.message}>
          <Input type="tel" placeholder="08012345678" {...register("phone")} />
        </FormField>
        <FormField label="Password" required error={errors.password?.message}>
          <PasswordInput
            placeholder="At least 6 characters"
            {...register("password")}
          />
        </FormField>
        <FormField
          label="Confirm Password"
          required
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            placeholder="Re-enter your password"
            {...register("confirmPassword")}
          />
        </FormField>

        <Button
          type="submit"
          size="lg"
          style={{ width: "100%" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Creating account..."
          ) : (
            <>
              Create Account <ArrowRight size={18} />
            </>
          )}
        </Button>
      </form>
    </AuthLayout>
  );
};
