"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import CurrencyDropdown, { CURRENCY_SYMBOL_MAP } from "./CurrencyDropdown";

interface InputItem {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
}

interface SplitInputFieldProps {
  left: InputItem;
  right: InputItem;
  currency?: string;
  currencySelected?: boolean;
  onCurrencyChange?: (currency: string) => void;
  offsetX?: number;
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerMove?: (e: React.PointerEvent) => void;
  onPointerUp?: () => void;
  onDelete?: () => void;
}

export default function SplitInputField({
  left,
  right,
  currency = "",
  currencySelected = false,
  onCurrencyChange,
  offsetX = 0,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onDelete,
}: SplitInputFieldProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const currencyBtnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const openDropdown = () => {
    if (currencyBtnRef.current && containerRef.current) {
      const btnRect = currencyBtnRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: btnRect.bottom + window.scrollY + 20,
        right: window.innerWidth - containerRect.right,
      });
    }
    setDropdownOpen(true);
  };

  return (
    <div ref={containerRef} className="relative mx-4 rounded-[12px]">
      <div className="absolute right-0 top-0 flex w-[80px] h-[46px] items-center justify-center bg-red-100 hover:bg-[#FFDADA] rounded-[8000px]">
        <button onClick={onDelete} className="text-[14px] font-semibold text-red-500">삭제</button>
      </div>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          transform: `translateX(${offsetX}px)`,
          transition: offsetX === 0 ? "transform 0.2s" : "none",
        }}
        className="flex h-[50px] w-full items-center rounded-[12px] bg-[#F7F8F9] px-[15px] hover:border hover:border-main-mint touch-none"
      >
        <input
          type={left.type ?? "text"}
          value={left.value}
          onChange={(e) => left.onChange?.(e.target.value)}
          placeholder={left.placeholder}
          className="pretendard-m-15 min-w-0 flex-1 bg-transparent text-main-black placeholder:text-sub-gray-2 outline-none"
        />
        <div className="flex min-w-0 flex-1 items-center justify-end pl-[12px]">
          <input
            type={right.type ?? "text"}
            value={right.value}
            onChange={(e) => right.onChange?.(e.target.value)}
            placeholder={right.placeholder}
            className="pretendard-sb-15 min-w-0 bg-transparent text-right text-main-black placeholder:text-sub-gray-2 outline-none"
          />
          <button
            ref={currencyBtnRef}
            type="button"
            onClick={openDropdown}
            onPointerDown={(e) => e.stopPropagation()}
            className={`pretendard-sb-15 ml-1 shrink-0 ${currencySelected ? "text-main-black" : "text-sub-gray-2"}`}
          >
            {CURRENCY_SYMBOL_MAP[currency] ?? currency}
          </button>
        </div>
      </div>

      {dropdownOpen && createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setDropdownOpen(false)} />
          <div
            style={{ top: dropdownPos.top, right: dropdownPos.right, position: "absolute" }}
            className="z-[9999]"
          >
            <CurrencyDropdown
              selected={currency}
              onSelect={(c) => {
                onCurrencyChange?.(c);
                setDropdownOpen(false);
              }}
            />
          </div>
        </>,
        document.body
      )}
    </div>
  );
}
