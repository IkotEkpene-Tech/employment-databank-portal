import { Database, Target, Fingerprint, Lock, CreditCard, UserCheck, Mail } from "lucide-react";
import { LegalLayout } from "../components/LegalLayout";
import { LegalSection } from "../components/LegalSection";
import { SummaryCallout } from "../components/SummaryCallout";

const TOC = [
  { id: "information-we-collect", label: "Information We Collect" },
  { id: "how-we-use-it", label: "How We Use Your Information" },
  { id: "nin-verification", label: "NIN Verification" },
  { id: "data-security", label: "Data Storage & Security" },
  { id: "payment-information", label: "Payment Information" },
  { id: "your-rights", label: "Your Rights" },
  { id: "contact", label: "Contact" },
];

const SUMMARY_POINTS = [
  "Your NIN is used only for identity verification, never as a login",
  "Access codes and passwords are stored as secure hashes, never in plain text",
  "We never store your card or bank details",
  "You can request a copy or deletion of your data at any time",
];

export const PrivacyPolicyPage = () => (
  <LegalLayout eyebrow="Legal" title="Privacy Policy" documentTitle="Privacy Policy" toc={TOC} summary={<SummaryCallout points={SUMMARY_POINTS} />}>
    <LegalSection id="information-we-collect" icon={Database} tone="primary" title="Information We Collect">
      <p>
        To register you on the Ikot Ekpene Local Government Area Employment Databank, we collect:
      </p>
      <ul>
        <li>Your full name, email address and phone number</li>
        <li>Your National Identification Number (NIN), used solely for identity verification</li>
        <li>Your date of birth, gender, and voter identification number (VIN)</li>
        <li>Your ward, village, and village head's contact details</li>
        <li>Your educational qualification, discipline, and vocational skills</li>
        <li>Supporting documents, including your Certificate of Origin and educational certificates</li>
        <li>Payment reference information for your ₦500 registration fee</li>
      </ul>
    </LegalSection>

    <LegalSection id="how-we-use-it" icon={Target} tone="secondary" title="How We Use Your Information">
      <p>Your information is used to:</p>
      <ul>
        <li>Verify your identity and confirm your eligibility as an Ikot Ekpene indigene</li>
        <li>Process your registration fee and issue your access code</li>
        <li>Match you to relevant job placements, vocational training, and empowerment programmes</li>
        <li>Contact you regarding your application status or opportunities</li>
        <li>Prevent duplicate registrations using the same NIN</li>
      </ul>
    </LegalSection>

    <LegalSection id="nin-verification" icon={Fingerprint} tone="accent" title="NIN Verification">
      <p>
        Your NIN is submitted to a NIMC-integrated verification provider solely to confirm your
        identity. We do not use your NIN for any purpose other than verification and duplicate
        prevention, and it is never used as a login credential.
      </p>
    </LegalSection>

    <LegalSection id="data-security" icon={Lock} tone="primary" title="Data Storage & Security">
      <p>
        Your access code is never stored in plain text — only a secure hash is kept, and it expires
        automatically after a limited period. Passwords are stored using industry-standard hashing.
        We apply reasonable technical and organizational measures to protect your data against
        unauthorized access, alteration, or disclosure.
      </p>
    </LegalSection>

    <LegalSection id="payment-information" icon={CreditCard} tone="secondary" title="Payment Information">
      <p>
        Payments are processed by our third-party payment provider (Paystack/Flutterwave). We do
        not store your card or bank details — only the payment reference and status are retained
        against your registration record.
      </p>
    </LegalSection>

    <LegalSection id="your-rights" icon={UserCheck} tone="accent" title="Your Rights">
      <p>You may:</p>
      <ul>
        <li>Request a copy of the information we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request account and data deletion, subject to statutory record-keeping obligations</li>
      </ul>
      <p>To exercise these rights, use the complaint widget on this site or contact the LGA Secretariat directly.</p>
    </LegalSection>

    <LegalSection id="contact" icon={Mail} tone="primary" title="Contact">
      <p>
        For questions about this Privacy Policy, please reach out through the complaint form on
        this portal or visit the Ikot Ekpene Local Government Area Secretariat.
      </p>
    </LegalSection>
  </LegalLayout>
);
