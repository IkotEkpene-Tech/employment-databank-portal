import { keyframes } from "styled-components";

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const slowZoom = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.08); }
`;

export const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
`;

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(254, 99, 1, 0.4); }
  50% { box-shadow: 0 0 0 10px rgba(254, 99, 1, 0); }
`;

export const shimmer = keyframes`
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 0%; }
`;

export const ripple = keyframes`
  0% { transform: scale(1); opacity: 0.4; }
  100% { transform: scale(2.2); opacity: 0; }
`;

export const checkPop = keyframes`
  0% { transform: scale(0.4); opacity: 0; }
  70% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); }
`;
