"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import BelogIcon from "@/components/ui/BelogIcon";

const MENU_ITEMS = [
  { label: "그룹 생성", href: "/group/new" },
  { label: "초대코드로 참여", href: "/group/join" },
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
          className="fixed inset-0 z-[55] bg-black/65"
        />
      )}

      <div className="fixed bottom-20 right-4 z-[60] flex flex-col items-end gap-2">
        {isOpen && (
          <div className="flex w-[161px] flex-col rounded-[12px] bg-main-white p-2 shadow-[0_0_5px_0_rgba(0,0,0,0.1)]">
            {MENU_ITEMS.map(({ label, href }) => (
              <button
                key={href}
                type="button"
                onClick={() => handleSelect(href)}
                className="flex h-[48px] w-full items-center gap-3 rounded-xl bg-transparent px-4 text-left transition-colors hover:bg-main-mint/20"
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
          className="relative flex size-[60px] items-center justify-center overflow-hidden rounded-full bg-main-white shadow-[0_0_5px_0_rgba(0,0,0,0.05)]"
        >
          {isOpen ? (
            <span className="absolute -bottom-1 right-0">
              <BelogIcon width={40} height={40} />
            </span>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="#303237"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
