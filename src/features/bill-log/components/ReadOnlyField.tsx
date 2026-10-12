"use client";

import Profile from "@/components/ui/Profile";
import SelectableToggle from "./SelectableToggle";

interface ReadOnlyFieldProps {
  name: string;
  amount: string;
  profileSrc?: string;
  tag?: boolean;
  editable?: boolean;
  onAmountChange?: (value: string) => void;
  menu?: { name: string; amount: number }[];
  selectedItems?: string[];
  onToggleItem?: (itemName: string) => void;
}

export default function ReadOnlyField({
  name,
  amount,
  profileSrc,
  tag = false,
  editable = false,
  onAmountChange,
  menu = [],
  selectedItems = [],
  onToggleItem,
}: ReadOnlyFieldProps) {
  return (
    <div className="flex flex-col mx-4 items-center gap-[14px] rounded-[12px] border border-sub-gray-3 px-4 py-4">
      <div className="flex justify-between w-full">
        <Profile src={profileSrc} width={30} height={30} />
        <div className="flex flex-1 items-center">
          <p className="pretendard-m-16 flex-1 text-main-black ml-3">{name}</p>
          {editable ? (
            <div className="flex items-center">
              <input
                type="number"
                value={amount}
                onChange={(e) => onAmountChange?.(e.target.value)}
                placeholder="0"
                className="pretendard-sb-16 w-24 bg-transparent text-right text-main-black outline-none placeholder:text-sub-gray-2"
              />
              {amount && <span className="pretendard-sb-16 text-main-black">원</span>}
            </div>
          ) : (
            <p className="pretendard-sb-16 text-main-black">{amount}</p>
          )}
        </div>
      </div>
      {tag && (
        <div className="flex gap-3 w-full overflow-x-auto scrollbar-none">
          {menu.map((item) => (
            <SelectableToggle
              key={item.name}
              label={item.name}
              selected={selectedItems.includes(item.name)}
              onClick={() => onToggleItem?.(item.name)}
              variant="sub"
            />
          ))}
        </div>
      )}
    </div>
  );
}
