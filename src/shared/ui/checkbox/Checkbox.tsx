import * as React from "react";
import styled from "styled-components";

const Wrap = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Box = styled.input`
  width: 1.1rem;
  height: 1.1rem;
  accent-color: ${({ theme }) => theme.colors.primary.DEFAULT};
  cursor: pointer;
`;

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
>(({ label, ...props }, ref) => (
  <Wrap>
    <Box ref={ref} type="checkbox" {...props} />
    {label}
  </Wrap>
));
Checkbox.displayName = "Checkbox";
