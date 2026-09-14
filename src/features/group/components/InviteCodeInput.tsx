"use client";

import { useRef } from "react";

interface InviteCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export default function InviteCodeInput({
  value,
  onChange,
  length = 6,
}: InviteCodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? "");

  const setChar = (index: number, char: string) => {
    const next = chars.slice();
    next[index] = char;
    onChange(next.join("").slice(0, length));
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const char = e.target.value.slice(-1).toUpperCase();
    setChar(index, char);
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !chars[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-[10px]">
      {chars.map((char, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          value={char}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          maxLength={1}
          inputMode="text"
          autoFocus={index === 0}
          className="pretendard-sb-20 h-[46px] w-[42px] rounded-[10px] bg-[#F7F8F9] text-center text-main-black outline-none focus:border focus:border-main-mint"
        />
      ))}
    </div>
  );
}
