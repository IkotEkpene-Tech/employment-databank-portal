import { UseFormReturn } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription, CardContent, Input, Select } from "@/shared/ui";
import { FormField } from "@/features/auth/components/FormField";
import type { RegistrationFormValues } from "../../types";
import type { User } from "@/features/auth/api/types";

interface Props {
  form: UseFormReturn<RegistrationFormValues>;
  user: User;
}

export const PersonalInfoStep = ({ form, user }: Props) => {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Tell us your name and how to reach you</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
          <FormField label="Surname" required error={errors.surname?.message}>
            <Input placeholder="e.g. Akpan" {...register("surname")} />
          </FormField>
          <FormField label="First Name" required error={errors.firstName?.message}>
            <Input placeholder="e.g. Uduak" {...register("firstName")} />
          </FormField>
          <FormField label="Other Name" error={errors.otherName?.message}>
            <Input placeholder="e.g. Tom" {...register("otherName")} />
          </FormField>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <FormField label="Date of Birth (from NIN)">
            <Input readOnly value={user.dob ?? ""} />
          </FormField>
          <FormField label="Gender" required error={errors.gender?.message}>
            <Select {...register("gender")}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormField>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <FormField label="Phone Number (verified)">
            <Input readOnly value={user.phone} />
          </FormField>
          <FormField label="Email Address (verified)">
            <Input readOnly value={user.email} />
          </FormField>
        </div>

        <FormField
          label="Voter Identification Number (VIN)"
          required
          error={errors.vin?.message}
        >
          <Input placeholder="Enter your 19+ character VIN" {...register("vin")} />
        </FormField>
      </CardContent>
    </>
  );
};
