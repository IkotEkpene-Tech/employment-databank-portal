import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { StyledButton, ButtonVariant, ButtonSize } from "./Button.styles";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <StyledButton
        as={Comp as never}
        $variant={variant}
        $size={size}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
