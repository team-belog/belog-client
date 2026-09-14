"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import BelogIcon from "@/components/ui/BelogIcon";

const MENU_ITEMS = [
  {
    label: "그룹 생성하기",
    href: "/group/new",
    highlighted: true,
  },
  {
    label: "초대코드로 참여",
    href: "/group/join",
    highlighted: false,
  },
] as const;

export default function HomeFab() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="메뉴 닫기"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60"
        />
      )}

      <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
        {isOpen && (
          <div className="flex w-[161px] flex-col rounded-[20px] bg-main-white p-2 shadow-[0_0_5px_0_rgba(0,0,0,0.1)]">
            {MENU_ITEMS.map(({ label, href, highlighted }) => (
              <button
                key={href}
                type="button"
                onClick={() => handleSelect(href)}
                className={`flex h-[48px] w-full items-center gap-3 rounded-xl px-4 text-left ${
                  highlighted ? "bg-main-cool-gray" : "bg-transparent"
                }`}
              >
                <span className="pretendard-m-15 whitespace-nowrap text-main-black">
                  {label}
                </span>
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          aria-label={isOpen ? "빠른 실행 메뉴 닫기" : "빠른 실행 메뉴 열기"}
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex size-[60px] items-center justify-center rounded-full border border-[#F1F4F9] bg-main-cool-gray shadow-[0_0_5px_0_rgba(0,0,0,0.05)]"
        >
          <BelogIcon width={26} height={25} />
        </button>
      </div>
    </>
  );
}
