import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ArrowRight, ListChecks, Sparkle } from "lucide-react";
import { Button } from "@/shared/ui";
import { GlowWrap } from "@/shared/components";
import {
  Section,
  ContentWrap,
  ContentCol,
  Eyebrow,
  EyebrowText,
  Title,
  Subtitle,
  CtaRow,
  MediaCol,
  MediaFrame,
  SlideLayer,
  SlideImage,
  SlideCaption,
  CaptionName,
  CaptionRole,
  Indicators,
  Dot,
} from "./HeroSection.styles";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaLink?: string;
  glow?: boolean;
  caption?: { name: string; role: string };
}

const MobileRequirementsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.6rem 1.1rem;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  font-size: 0.8125rem;
  font-weight: 600;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    display: none;
  }
`;

const heroSlides: HeroSlide[] = [
  {
    image: "/logo/ik-logo-2.png",
    title: "Ikot Ekpene Indigene Employment Databank",
    subtitle:
      "Register once to be counted for job placements, vocational training, and empowerment programmes across Ikot Ekpene Local Government Area.",
    ctaLabel: "Register Now",
    ctaLink: "/register",
    glow: true,
  },
  {
    image: "/hon-nkom.jpeg",
    title: "A Databank Built for Every Indigene",
    subtitle:
      "“This programme exists to help our people find sustainable employment and skills development opportunities — it is for Ikot Ekpene indigenes only.”",
    caption: { name: "Hon. (Eld) Aniefiok Nkom", role: "Executive Chairman, Ikot Ekpene LGA" },
  },
  {
    image: "/logo/akwa-ibom-logo-main.png",
    title: "Jobs, Skills and More Opportunities",
    subtitle:
      "From vocational training to verified job leads, your registration connects you directly to opportunities designed for Ikot Ekpene indigenes.",
    ctaLabel: "Start Registration",
    ctaLink: "/register",
  },
];

export const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const active = heroSlides[current];

  const cta = active.ctaLink && (
    <Button asChild size="lg" variant="secondary">
      <Link to={active.ctaLink}>
        {active.ctaLabel}
        <ArrowRight size={18} />
      </Link>
    </Button>
  );

  return (
    <Section id="home">
      <ContentWrap>
        <ContentCol>
          <Eyebrow>
            <Sparkle size={15} fill="#FDDF49" color="#FDDF49" />
            <EyebrowText>Ikot Ekpene LGA</EyebrowText>
          </Eyebrow>
          <Title key={`title-${current}`}>{active.title}</Title>
          <Subtitle key={`subtitle-${current}`}>{active.subtitle}</Subtitle>
          {cta && <CtaRow key={`cta-${current}`}>{active.glow ? <GlowWrap>{cta}</GlowWrap> : cta}</CtaRow>}
          <MobileRequirementsLink to="/#requirements">
            <ListChecks size={16} /> View Requirements
          </MobileRequirementsLink>
        </ContentCol>

        <MediaCol>
          <MediaFrame>
            {heroSlides.map((slide, index) => (
              <SlideLayer key={index} $active={index === current}>
                <SlideImage src={slide.image} alt={slide.caption?.name ?? "Employment databank"} />
                {slide.caption && (
                  <SlideCaption>
                    <CaptionName>{slide.caption.name}</CaptionName>
                    <CaptionRole>{slide.caption.role}</CaptionRole>
                  </SlideCaption>
                )}
              </SlideLayer>
            ))}
          </MediaFrame>
          <Indicators>
            {heroSlides.map((_, index) => (
              <Dot
                key={index}
                $active={index === current}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </Indicators>
        </MediaCol>
      </ContentWrap>
    </Section>
  );
};
