import { colors } from "./colors";
import { withAlpha } from "./utils";

export const theme = {
  colors: {
    background: colors.background,
    foreground: colors.foreground,
    card: colors.card,
    cardForeground: colors.cardForeground,
    popover: colors.popover,
    popoverForeground: colors.popoverForeground,
    primary: { DEFAULT: colors.primary, foreground: colors.primaryForeground },
    secondary: { DEFAULT: colors.secondary, foreground: colors.secondaryForeground },
    muted: { DEFAULT: colors.muted, foreground: colors.mutedForeground },
    accent: { DEFAULT: colors.accent, foreground: colors.accentForeground },
    destructive: { DEFAULT: colors.destructive, foreground: colors.destructiveForeground },
    success: { DEFAULT: colors.success, foreground: colors.successForeground },
    border: colors.border,
    input: colors.input,
    ring: colors.ring,
    white: colors.white,
    black: colors.black,
    navHover: colors.navHover,
    highlight: colors.highlight,
    highlightMuted: colors.highlightMuted,
    gray700: colors.gray700,
    gray500: colors.gray500,
    primaryLight: colors.primaryLight,
    heroDeep: colors.heroDeep,
    servicesBackground: colors.servicesBackground,
    footerDark: colors.footerDark,
    footerGlow: colors.footerGlow,
    platformBlendTop: colors.platformBlendTop,
    platformBlendMid: colors.platformBlendMid,
    platformBlendBottom: colors.platformBlendBottom,
  },

  alpha: withAlpha,

  gradients: {
    hero: `linear-gradient(135deg, ${withAlpha(colors.primary, 0.95)}, ${withAlpha(colors.primaryLight, 0.9)})`,
    accent: `linear-gradient(135deg, ${colors.secondary}, #EB9A4C)`,
    heroScene: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.heroDeep} 55%, ${colors.black} 100%)`,
    panel: `linear-gradient(160deg, ${colors.primary} 0%, ${colors.heroDeep} 100%)`,
    footer: `radial-gradient(ellipse 140% 90% at 50% 0%, ${colors.footerGlow} 0%, ${colors.footerDark} 60%, ${colors.black} 100%)`,
    platform: `linear-gradient(180deg, ${colors.platformBlendTop} 0%, ${colors.platformBlendMid} 55%, ${colors.platformBlendBottom} 100%)`,
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    elegant: `0 10px 40px -10px ${withAlpha(colors.primary, 0.2)}`,
  },

  radii: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },

  fonts: {
    sans: "'DM Sans', system-ui, sans-serif",
    display: "'Playfair Display', serif",
  },

  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  container: { maxWidth: "1400px", padding: "1rem" },

  zIndex: { dropdown: 40, sticky: 45, topBar: 50, navbar: 50, modal: 60, floatingAction: 55 },

  transitions: { fast: "150ms ease", base: "300ms ease", slow: "500ms ease" },
} as const;

export type Theme = typeof theme;
