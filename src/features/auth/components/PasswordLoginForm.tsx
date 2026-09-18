import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "./FormField";
import { Input, PasswordInput, Button, toast } from "@/shared/ui";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "@/shared/lib";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

interface PasswordLoginFormProps {
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export const PasswordLoginForm = ({
  onSubmittingChange,
}: PasswordLoginFormProps) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  useEffect(() => {
    onSubmittingChange(isSubmitting);
  }, [isSubmitting, onSubmittingChange]);

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values);
      const from = (location.state as { from?: Location })?.from as unknown as
        | string
        | undefined;
      navigate(from || "/dashboard", { replace: true });
    } catch (error) {
      if (error instanceof ApiError && error.status === 403) {
        toast.info(
          "Please verify your email first — we've sent you a new code.",
        );
        navigate("/verify-email", { state: { email: values.email } });
        return;
      }
      toast.error(
        error instanceof Error ? error.message : "Invalid email or password",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Email Address" required error={errors.email?.message}>
        <Input
          type="email"
          placeholder="example@email.com"
          {...register("email")}
        />
      </FormField>
      <FormField label="Password" required error={errors.password?.message}>
        <PasswordInput placeholder="••••••••" {...register("password")} />
      </FormField>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Link
          to="/forgot-password"
          style={{ fontSize: "0.8125rem", color: "#0B4923", fontWeight: 600 }}
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        size="lg"
        style={{ width: "100%" }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Log In"}
      </Button>
    </form>
  );
};
