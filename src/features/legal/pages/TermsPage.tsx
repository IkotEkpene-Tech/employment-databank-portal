import { BadgeCheck, Wallet, Fingerprint, KeyRound, FileCheck2, Briefcase, RefreshCcw, Mail } from "lucide-react";
import { LegalLayout } from "../components/LegalLayout";
import { LegalSection } from "../components/LegalSection";
import { SummaryCallout } from "../components/SummaryCallout";

const TOC = [
  { id: "eligibility", label: "Eligibility" },
  { id: "registration-fee", label: "Registration Fee" },
  { id: "one-nin", label: "One Registration Per NIN" },
  { id: "account-access-code", label: "Account & Access Code" },
  { id: "accuracy", label: "Accuracy of Information" },
  { id: "no-guarantee", label: "No Guarantee of Employment" },
  { id: "changes", label: "Changes to These Terms" },
  { id: "contact", label: "Contact" },
];

const SUMMARY_POINTS = [
  "Open only to Ikot Ekpene LGA indigenes",
  "₦500 one-time, non-refundable verification fee",
  "One registration allowed per NIN",
  "Registration does not guarantee employment",
];

export const TermsPage = () => (
  <LegalLayout eyebrow="Legal" title="Terms & Conditions" documentTitle="Terms & Conditions" toc={TOC} summary={<SummaryCallout points={SUMMARY_POINTS} />}>
    <LegalSection id="eligibility" icon={BadgeCheck} tone="primary" title="Eligibility">
      <p>
        This portal is open exclusively to indigenes of Ikot Ekpene Local Government Area. By
        registering, you confirm that the information you provide, including your NIN and
        residency details, is accurate and that you are entitled to register under this programme.
      </p>
    </LegalSection>

    <LegalSection id="registration-fee" icon={Wallet} tone="secondary" title="Registration Fee">
      <p>
        A one-time, non-refundable fee of ₦500 is required to process your NIN verification. This
        fee covers the cost of identity verification and administrative processing.
      </p>
      <ul>
        <li>If your NIN verification fails due to a mismatch or invalid entry, you may correct and resubmit your NIN at no additional cost.</li>
        <li>Refunds are considered only in cases of permanent verification failure or duplicate payment, at the discretion of the LGA administration.</li>
      </ul>
    </LegalSection>

    <LegalSection id="one-nin" icon={Fingerprint} tone="accent" title="One Registration Per NIN">
      <p>
        Each NIN may be associated with only one registration. Attempting to register multiple
        accounts using the same NIN with different contact details is prohibited and may result in
        disqualification.
      </p>
    </LegalSection>

    <LegalSection id="account-access-code" icon={KeyRound} tone="primary" title="Account & Access Code">
      <p>
        After your NIN is verified, an access code is sent to your registered email address. This
        code is single-use and time-limited. You are responsible for keeping your access code,
        password, and account details confidential. Notify us immediately if you suspect
        unauthorized access to your account.
      </p>
    </LegalSection>

    <LegalSection id="accuracy" icon={FileCheck2} tone="secondary" title="Accuracy of Information">
      <p>
        You are responsible for the accuracy of all information and documents submitted, including
        your educational qualifications, vocational skills, and village authority details.
        Submitting false information may result in disqualification from the databank and any
        associated programmes.
      </p>
    </LegalSection>

    <LegalSection id="no-guarantee" icon={Briefcase} tone="accent" title="No Guarantee of Employment">
      <p>
        Registration on this databank does not guarantee employment, training placement, or
        financial support. It serves as a record of eligible indigenes for consideration when
        opportunities arise.
      </p>
    </LegalSection>

    <LegalSection id="changes" icon={RefreshCcw} tone="primary" title="Changes to These Terms">
      <p>
        The Ikot Ekpene Local Government Area reserves the right to update these Terms &amp;
        Conditions at any time. Continued use of this portal after changes are posted constitutes
        acceptance of the updated terms.
      </p>
    </LegalSection>

    <LegalSection id="contact" icon={Mail} tone="secondary" title="Contact">
      <p>
        Questions about these Terms can be raised through the complaint form on this portal or at
        the Ikot Ekpene Local Government Area Secretariat.
      </p>
    </LegalSection>
  </LegalLayout>
);
