export interface Village {
  id?: string;
  name: string;
}

export interface Ward {
  id: string;
  name: string;
  villages: Village[];
}

export interface RegistrationFormValues {
  surname: string;
  firstName: string;
  otherName: string;
  gender: string;
  vin: string;
  ward: string;
  village: string;
  hasEducation: "yes" | "no" | "";
  highestQualification: string;
  discipline: string;
  otherDiscipline: string;
  certificate: File | null;
  vocationalSkill: string;
  otherSkill: string;
  skillAcquisition: string;
  otherSkillAcquisition: string;
  villageHeadName: string;
  villageHeadPhone: string;
  certificateOfOrigin: File | null;
}

export type SerializableFormValues = Omit<RegistrationFormValues, "certificate" | "certificateOfOrigin">;

export interface RegistrationDraft {
  values: Partial<SerializableFormValues>;
  step: number;
  updatedAt?: string;
}

// The full, immutable record as it exists after final submission — read
// via GET /applicants/application (only ever returned when submitted).
export interface SubmittedApplication {
  applicantId: string;
  firstName: string;
  surname: string;
  otherName?: string;
  gender: string;
  dob: string;
  ninLast4?: string;
  vin: string;
  ward: string;
  village: string;
  hasEducation: "yes" | "no";
  highestQualification?: string;
  discipline?: string;
  otherDiscipline?: string;
  vocationalSkill: string;
  otherSkill?: string;
  skillAcquisition?: string;
  otherSkillAcquisition?: string;
  villageHeadName: string;
  villageHeadPhone: string;
  certificateUrl?: string;
  certificateOfOriginUrl: string;
  submittedAt?: string;
}

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
