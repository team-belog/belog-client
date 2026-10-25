"use client";

const CURRENCIES = ["KRW", "USD", "JPY", "EUR", "GBP", "CNY", "AUD", "CAD", "CHF", "SGD"];

interface CurrencyDropdownProps {
  selected: string;
  onSelect: (currency: string) => void;
}

export default function CurrencyDropdown({ selected, onSelect }: CurrencyDropdownProps) {
  return (
    <div className="w-[66px] rounded-[12px] border border-[#F1F4F9] bg-white shadow-[0px_0px_8px_rgba(0,0,0,0.08)] p-2 max-h-[176px] overflow-y-auto scrollbar-thin">
      {CURRENCIES.map((currency) => (
        <button
          key={currency}
          type="button"
          onClick={() => onSelect(currency)}
          className={`flex h-[40px] w-full items-center justify-center rounded-[8px] px-[15px] pretendard-m-14 text-main-black hover:bg-main-cool-gray whitespace-nowrap ${
            currency === selected ? "bg-main-cool-gray" : ""
          }`}
        >
          {currency}
        </button>
      ))}
    </div>
  );
}
