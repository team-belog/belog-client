import { useState } from "react";
import Profile from "@/components/ui/Profile";
import SelectableToggle from "./SelectableToggle";
import { DUMMY_CONTENT } from "../constants/dummy";

interface ReadOnlyFieldProps {
  name: string;
  amount: string;
  profileSrc?: string;
  tag?: boolean;
}

export default function ReadOnlyField({ name, amount, profileSrc, tag = false }: ReadOnlyFieldProps) {
  const [selectedMenu, setSelectedMenu] = useState<string[]>([]);

  const toggleMenu = (item: string) => {
    setSelectedMenu((prev) =>
      prev.includes(item) ? prev.filter((m) => m !== item) : [...prev, item]
    );
  };

  const menu = DUMMY_CONTENT[0].menu;

  return (
    <div className="flex flex-col mx-4 items-center gap-[14px] rounded-[12px] border border-sub-gray-3 px-4 py-4">
      <div className="flex justify-between w-full">
        <Profile src={profileSrc} width={30} height={30} />
        <div className="flex flex-1 items-center">
          <p className="pretendard-m-16 flex-1 text-main-black ml-3">{name}</p>
          <p className="pretendard-sb-16 text-main-black">{amount}</p>
        </div>
      </div>
      {tag && (
        <div className="flex gap-3 w-full mt-4">
          {menu.map((item) => (
            <SelectableToggle
              key={item.title}
              label={item.title}
              selected={selectedMenu.includes(item.title)}
              onClick={() => toggleMenu(item.title)}
              variant="sub"
            />
          ))}
        </div>
      )}
    </div>
  );
}
