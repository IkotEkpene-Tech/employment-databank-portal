import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import styled from "styled-components";
import { X } from "lucide-react";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

const StyledOverlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: ${({ theme }) => theme.zIndex.modal};
  animation: fadeIn 150ms ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const StyledContent = styled(DialogPrimitive.Content)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 2rem);
  max-width: 32rem;
  max-height: 90vh;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii["2xl"]};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  z-index: ${({ theme }) => theme.zIndex.modal};
  padding: 1.75rem;

  &:focus {
    outline: none;
  }
`;

const CloseButton = styled(DialogPrimitive.Close)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.muted.DEFAULT};
  color: ${({ theme }) => theme.colors.muted.foreground};
  border: none;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { hideClose?: boolean }
>(({ children, hideClose, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <StyledOverlay />
    <StyledContent ref={ref} {...props}>
      {children}
      {!hideClose && (
        <CloseButton aria-label="Close">
          <X size={16} />
        </CloseButton>
      )}
    </StyledContent>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

export const DialogTitle = styled(DialogPrimitive.Title)`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  margin: 0 0 0.5rem;
`;

export const DialogDescription = styled(DialogPrimitive.Description)`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  margin: 0 0 1rem;
`;
