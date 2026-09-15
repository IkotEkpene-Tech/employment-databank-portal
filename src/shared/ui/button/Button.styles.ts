import styled, { css } from "styled-components";

export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";
export type ButtonSize = "sm" | "default" | "lg" | "icon";

const variantStyles = {
  default: css`
    background: ${({ theme }) => theme.colors.primary.DEFAULT};
    color: ${({ theme }) => theme.colors.primary.foreground};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.9)};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary.DEFAULT};
    color: ${({ theme }) => theme.colors.secondary.foreground};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
    border: 1.5px solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
      background: ${({ theme }) => theme.colors.muted.DEFAULT};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.foreground};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.muted.DEFAULT};
    }
  `,
  destructive: css`
    background: ${({ theme }) => theme.colors.destructive.DEFAULT};
    color: ${({ theme }) => theme.colors.destructive.foreground};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.alpha(theme.colors.destructive.DEFAULT, 0.9)};
    }
  `,
  link: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
    padding: 0;
    height: auto;
    text-decoration: underline;
    text-underline-offset: 4px;
  `,
};

const sizeStyles = {
  sm: css`
    height: 2.25rem;
    padding: 0 0.875rem;
    font-size: 0.8125rem;
  `,
  default: css`
    height: 2.75rem;
    padding: 0 1.25rem;
    font-size: 0.9375rem;
  `,
  lg: css`
    height: 3.25rem;
    padding: 0 2rem;
    font-size: 1rem;
  `,
  icon: css`
    height: 2.75rem;
    width: 2.75rem;
    padding: 0;
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.radii.lg};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant }) => variantStyles[$variant]}
  ${({ $size }) => sizeStyles[$size]}
`;
