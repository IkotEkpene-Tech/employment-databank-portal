import * as AvatarPrimitive from "@radix-ui/react-avatar";
import styled from "styled-components";

export const Avatar = styled(AvatarPrimitive.Root)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  overflow: hidden;
  flex-shrink: 0;
`;

export const AvatarImage = styled(AvatarPrimitive.Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarFallback = styled(AvatarPrimitive.Fallback)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary.DEFAULT};
  color: ${({ theme }) => theme.colors.primary.foreground};
  font-weight: 700;
  font-size: 0.875rem;
`;
