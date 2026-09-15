import { useEffect, useState } from "react";
import styled from "styled-components";
import { ArrowUp } from "lucide-react";

const Button = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 1.5rem;
  left: 1.25rem;
  z-index: ${({ theme }) => theme.zIndex.floatingAction};
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.secondary.DEFAULT};
  color: #ffffff;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? "0" : "0.75rem")});
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: all ${({ theme }) => theme.transitions.base};

  &:hover {
    background: ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.9)};
    transform: translateY(-2px);
  }
`;

export const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      $visible={visible}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </Button>
  );
};
