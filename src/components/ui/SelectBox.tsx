"use client";

import { useEffect, useRef, useState } from "react";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectBoxProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

export default function SelectBox({
  value,
  onChange,
  options,
  placeholder = "선택",
  disabled = false,
}: SelectBoxProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (next: string) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`pretendard-m-15 flex h-[50px] w-full items-center justify-between rounded-[12px] bg-main-cool-gray px-[15px] text-left outline-none focus-visible:ring-1 focus-visible:ring-main-mint disabled:opacity-40 ${
          selected ? "text-main-black" : "text-sub-gray-2"
        }`}
      >
        <span className="truncate">
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`ml-2 shrink-0 text-sub-gray-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          width="12"
          height="6"
          viewBox="0 0 12 6"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 1L6 5L11 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="scrollbar-thin absolute left-0 right-0 top-[calc(100%+5px)] z-10 max-h-[223px] overflow-y-auto rounded-[12px] bg-main-cool-gray p-[7px]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className="pretendard-m-15 flex h-[50px] w-full items-center rounded-[12px] px-[15px] text-left text-main-black transition-colors hover:bg-main-mint/20"
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
