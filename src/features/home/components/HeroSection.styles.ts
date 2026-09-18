import styled from "styled-components";
import { fadeIn } from "@/theme/animations";

export const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 7.5rem 1.25rem 5rem;
  background: ${({ theme }) => theme.gradients.heroScene};
  color: #ffffff;
  min-height: 60rem;
  display: flex;
  align-items: center;
`;

export const ContentWrap = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  align-items: center;

  ${({ theme }) => `@media (min-width: ${theme.breakpoints.lg})`} {
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

export const ContentCol = styled.div`
  animation: ${fadeIn} 500ms ease;
`;

export const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 1.25rem;
`;

export const EyebrowText = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.highlightMuted};
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 4.2vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
  margin: 0 0 1rem;
  animation: ${fadeIn} 500ms ease;
`;

export const Subtitle = styled.p`
  font-size: 1.0625rem;
  line-height: 1.6;
  opacity: 0.88;
  max-width: 32rem;
  margin: 0 0 1.75rem;
  animation: ${fadeIn} 500ms ease;
`;

export const CtaRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: ${fadeIn} 500ms ease;
`;

export const MediaCol = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
`;

export const MediaFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 22rem;
  aspect-ratio: 4 / 3;
  overflow: hidden;
`;

export const SlideLayer = styled.div<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 1000ms ease;
`;

export const SlideImage = styled.img<{ $objectFit?: "contain" | "cover" }>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $objectFit = "contain" }) => $objectFit};
`;

export const SlideCaption = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.75), transparent);
  color: #ffffff;
  padding: 1rem 1.25rem 0.9rem;
`;

export const CaptionName = styled.p`
  font-weight: 700;
  font-size: 0.875rem;
  margin: 0;
`;

export const CaptionRole = styled.p`
  font-size: 0.75rem;
  opacity: 0.75;
  margin: 0.15rem 0 0;
`;

export const Indicators = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Dot = styled.button<{ $active: boolean }>`
  height: 0.5rem;
  width: ${({ $active }) => ($active ? "1.75rem" : "0.5rem")};
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#FE6301" : "rgba(255,255,255,0.35)")};
  transition: all ${({ theme }) => theme.transitions.base};
`;
