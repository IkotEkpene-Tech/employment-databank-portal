import { UseFormReturn } from "react-hook-form";
import styled from "styled-components";
import { CardHeader, CardTitle, CardDescription, CardContent, Input, Select } from "@/shared/ui";
import { FormField } from "@/features/auth/components/FormField";
import { vocationalSkills, educationalQualifications, disciplines } from "../../data/lookups";
import type { RegistrationFormValues } from "../../types";

const RadioRow = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.1rem;
`;

const RadioLabel = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  border: 1.5px solid ${({ theme, $checked }) => ($checked ? theme.colors.primary.DEFAULT : theme.colors.border)};
  background: ${({ theme, $checked }) => ($checked ? theme.colors.muted.DEFAULT : "#fafcfb")};
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: capitalize;
`;

interface Props {
  form: UseFormReturn<RegistrationFormValues>;
}

export const EducationSkillsStep = ({ form }: Props) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const hasEducation = watch("hasEducation");
  const discipline = watch("discipline");
  const vocationalSkill = watch("vocationalSkill");
  const skillAcquisition = watch("skillAcquisition");

  return (
    <>
      <CardHeader>
        <CardTitle>Education &amp; Skills</CardTitle>
        <CardDescription>Tell us what you've studied and what you can do</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField label="Do you have any educational qualification?" required error={errors.hasEducation?.message}>
          <RadioRow>
            {["yes", "no"].map((val) => (
              <RadioLabel key={val} $checked={hasEducation === val}>
                <input
                  type="radio"
                  value={val}
                  checked={hasEducation === val}
                  onChange={() => setValue("hasEducation", val as "yes" | "no")}
                />
                {val}
              </RadioLabel>
            ))}
          </RadioRow>
        </FormField>

        {hasEducation === "yes" && (
          <>
            <FormField label="Highest Qualification" required error={errors.highestQualification?.message}>
              <Select {...register("highestQualification")}>
                <option value="">Select your highest qualification</option>
                {educationalQualifications.map((q) => (
                  <option key={q.id} value={q.id}>
                    {q.label}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Discipline / Course of Study" required error={errors.discipline?.message}>
              <Select {...register("discipline")}>
                <option value="">Select your discipline</option>
                {disciplines.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Select>
            </FormField>

            {discipline === "Other" && (
              <FormField label="Specify Your Discipline" required error={errors.otherDiscipline?.message}>
                <Input placeholder="Enter your course of study" {...register("otherDiscipline")} />
              </FormField>
            )}

            <FormField label="Upload Certificate" error={errors.certificate?.message as string | undefined}>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setValue("certificate", e.target.files?.[0] ?? null)}
              />
            </FormField>
          </>
        )}

        <FormField label="Your Primary Skill" required error={errors.vocationalSkill?.message}>
          <Select {...register("vocationalSkill")}>
            <option value="">Select your primary skill</option>
            {vocationalSkills.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormField>

        {vocationalSkill === "Other" && (
          <FormField label="Specify Your Skill" required error={errors.otherSkill?.message}>
            <Input placeholder="Enter your specific skill" {...register("otherSkill")} />
          </FormField>
        )}

        <FormField label="Skill you'd like to learn" error={errors.skillAcquisition?.message}>
          <Select {...register("skillAcquisition")}>
            <option value="">Select a skill you'd like to learn</option>
            {vocationalSkills.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormField>

        {skillAcquisition === "Other" && (
          <FormField label="Specify Skill to Learn" required error={errors.otherSkillAcquisition?.message}>
            <Input placeholder="Enter the skill you want to learn" {...register("otherSkillAcquisition")} />
          </FormField>
        )}
      </CardContent>
    </>
  );
};
