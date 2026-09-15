import { Toaster as SonnerPrimitive, toast } from "sonner";
import { theme } from "@/theme";

export const Toaster = () => (
  <SonnerPrimitive
    position="top-right"
    toastOptions={{
      style: {
        fontFamily: theme.fonts.sans,
        borderRadius: theme.radii.lg,
      },
    }}
  />
);

export { toast };
