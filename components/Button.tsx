import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "default", ...props },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center hover:cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      default: "bg-[#00563b] text-[#ffffff] hover:bg-[#00563b]/90",

      destructive: "bg-[#ef4444] text-[#ffffff] hover:bg-[#ef4444]/90",

      outline:
        "border border-[#d4d9d6] bg-[#fafafa] text-[#0f2618] hover:bg-[#e77818] hover:text-[#ffffff]",

      secondary: "bg-[#eff1f0] text-[#0f2618] hover:bg-[#eff1f0]/80",

      ghost: "text-[#0f2618] hover:bg-[#e77818] hover:text-[#ffffff]",

      link: "text-[#00563b] underline-offset-4 hover:underline",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    };

    const combinedClassName =
      `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

    return <button className={combinedClassName} ref={ref} {...props} />;
  },
);

Button.displayName = "Button";

export { Button };
