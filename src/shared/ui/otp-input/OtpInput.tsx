import * as React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Cell = styled.input`
  width: 2.75rem;
  height: 3.25rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.DEFAULT};
  border: 1.5px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: #fafcfb;
  outline: none;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.DEFAULT};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.alpha(theme.colors.primary.DEFAULT, 0.1)};
  }
`;

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const OtpInput = ({ length = 8, value, onChange, disabled }: OtpInputProps) => {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);
  const chars = value.split("");

  const setChar = (index: number, char: string) => {
    const next = value.split("");
    next[index] = char;
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (index: number, raw: string) => {
    const char = raw.slice(-1).toUpperCase();
    setChar(index, char);
    if (char && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !chars[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().toUpperCase().slice(0, length);
    onChange(pasted);
  };

  return (
    <Row>
      {Array.from({ length }).map((_, index) => (
        <Cell
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={chars[index] ?? ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          maxLength={1}
          inputMode="text"
          autoComplete="off"
        />
      ))}
    </Row>
  );
};
