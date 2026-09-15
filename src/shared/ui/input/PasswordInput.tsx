import * as React from "react";
import { useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "./Input";

const Wrap = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.muted.foreground};

  &:hover {
    color: ${({ theme }) => theme.colors.primary.DEFAULT};
  }
`;

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ style, ...props }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <Wrap style={style}>
      <Input ref={ref} type={visible ? "text" : "password"} style={{ paddingRight: "2.5rem" }} {...props} />
      <ToggleButton
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        tabIndex={-1}
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </ToggleButton>
    </Wrap>
  );
});
PasswordInput.displayName = "PasswordInput";
