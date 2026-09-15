import { UseFormReturn } from "react-hook-form";
import { CardHeader, CardTitle, CardDescription, CardContent, Input, Select } from "@/shared/ui";
import { FormField } from "@/features/auth/components/FormField";
import type { RegistrationFormValues, Ward } from "../../types";

interface Props {
  form: UseFormReturn<RegistrationFormValues>;
  wards: Ward[];
}

export const LocationStep = ({ form, wards }: Props) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedWardId = watch("ward");
  const selectedWard = wards.find((w) => w.id === selectedWardId);
  const villageOptions = selectedWard?.villages ?? [];

  return (
    <>
      <CardHeader>
        <CardTitle>Where Are You From?</CardTitle>
        <CardDescription>Select your ward and village within Ikot Ekpene</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <FormField label="Ward" required error={errors.ward?.message}>
            <Select
              {...register("ward")}
              onChange={(e) => {
                setValue("ward", e.target.value);
                setValue("village", "");
              }}
            >
              <option value="">Select your ward</option>
              {wards.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Village" required error={errors.village?.message}>
            <Select disabled={!selectedWardId} {...register("village")}>
              <option value="">Select your village</option>
              {villageOptions.map((v) => (
                <option key={v.id ?? v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
            </Select>
          </FormField>
        </div>

        <p style={{ fontSize: "0.8125rem", color: "#677E76", margin: "0.5rem 0 1.25rem" }}>
          Provide the contact details of your village head for verification purposes.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          <FormField label="Name of Village Head" required error={errors.villageHeadName?.message}>
            <Input placeholder="Enter village head's name" {...register("villageHeadName")} />
          </FormField>
          <FormField label="Phone Number of Village Head" required error={errors.villageHeadPhone?.message}>
            <Input placeholder="08012345678" {...register("villageHeadPhone")} />
          </FormField>
        </div>
      </CardContent>
    </>
  );
};
