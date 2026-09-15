import styled from "styled-components";

export const Label = styled.label<{ $required?: boolean; $optional?: boolean }>`
  display: block;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
  margin-bottom: 0.4rem;

  ${({ $required, theme }) =>
    $required &&
    `
    &::after {
      content: " *";
      color: ${theme.colors.destructive.DEFAULT};
    }
  `}

  ${({ $optional, theme }) =>
    $optional &&
    `
    &::after {
      content: " (Optional)";
      color: ${theme.colors.muted.foreground};
      font-weight: 400;
      font-size: 0.6875rem;
    }
  `}
`;
