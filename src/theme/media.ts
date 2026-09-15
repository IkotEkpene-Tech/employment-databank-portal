import { theme } from "./theme";

type Breakpoint = keyof typeof theme.breakpoints;

export const media = (breakpoint: Breakpoint) =>
  `@media (min-width: ${theme.breakpoints[breakpoint]})`;
