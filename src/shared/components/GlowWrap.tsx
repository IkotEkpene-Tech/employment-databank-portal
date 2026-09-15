import { ReactNode } from "react";
import styled from "styled-components";
import { glowPulse } from "@/theme/animations";

const Wrap = styled.div`
  display: inline-block;
  border-radius: ${({ theme }) => theme.radii.full};
  animation: ${glowPulse} 2.4s ease-in-out infinite;
`;

export const GlowWrap = ({ children }: { children: ReactNode }) => <Wrap>{children}</Wrap>;
