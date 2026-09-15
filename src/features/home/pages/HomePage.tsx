import { useEffect } from "react";
import styled from "styled-components";
import { PageShell } from "@/shared/components";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { RequirementsSection } from "../components/RequirementsSection";
import { WhyRegisterSection } from "../components/WhyRegisterSection";
import { ValuesSection } from "../components/ValuesSection";
import { CtaSection } from "../components/CtaSection";

const PlatformPanel = styled.div`
  background: ${({ theme }) => theme.gradients.platform};
`;

export const HomePage = () => {
  useEffect(() => {
    document.title = "Ikot Ekpene LGA Employment Databank Registration Portal";
  }, []);

  return (
    <PageShell navVariant="overlay">
      <HeroSection />
      <AboutSection />
      <RequirementsSection />
      <PlatformPanel>
        <WhyRegisterSection />
        <ValuesSection />
      </PlatformPanel>
      <CtaSection />
    </PageShell>
  );
};
