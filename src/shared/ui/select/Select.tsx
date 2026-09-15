import * as React from "react";
import styled from "styled-components";
import { ChevronDown } from "lucide-react";

const Wrapper = styled.div`
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  appearance: none;
  color: ${({ theme }) => theme.colors.foreground};
  padding: 0.65rem 2.25rem 0.65rem 0.9rem;
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fafcfb;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const IconWrap = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.muted.foreground};
`;

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>((props, ref) => (
  <Wrapper>
    <StyledSelect ref={ref} {...props} />
    <IconWrap>
      <ChevronDown size={16} />
    </IconWrap>
  </Wrapper>
));
Select.displayName = "Select";
