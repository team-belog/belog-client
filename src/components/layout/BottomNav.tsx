"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import BelogIcon from "@/components/ui/BelogIcon";

const NAV_ITEMS = [
  { label: "홈", href: "/", icon: "home" },
  { label: "그룹", href: "/group", icon: "group" },
  { label: "마이", href: "/my", icon: "my" },
] as const;

const NAV_PATHS = NAV_ITEMS.map((item) => item.href);

export default function BottomNav() {
  const pathname = usePathname();

  const activeIndex = NAV_ITEMS.findIndex((item) => item.href === pathname);

  if (activeIndex === -1) return null;

  return (
    <nav className="fixed bottom-[21px] left-1/2 z-50 h-[62px] w-[276px] -translate-x-1/2 rounded-[30px] bg-main-white/70 shadow-[2px_2px_10px_0px_rgba(0,0,0,0.1)]">
      <span
        aria-hidden
        className="absolute inset-y-[8px] rounded-[30px] bg-[#E9E9E9]/70 transition-[left] duration-300 ease-out"
        style={{
          left: `calc(${activeIndex} * 33.3333% + 5px)`,
          width: "calc(33.3333% - 10px)",
        }}
      />

      <div className="relative flex h-full items-center">
        {NAV_ITEMS.map(({ label, href, icon }) => (
          <Link
            key={href}
            href={href}
            className="relative flex flex-1 flex-col items-center justify-center gap-1 py-[10px]"
          >
            <span className="flex size-[30px] items-center justify-center">
              {icon === "home" && (
                <Image src="/icons/home/nav-home.svg" alt="" width={30} height={30} />
              )}
              {icon === "group" && <BelogIcon width={20} height={19} />}
              {icon === "my" && <Image src="/icons/home/nav-my.svg" alt="" width={19} height={21} />}
            </span>
            <span className="pretendard-sb-10 text-main-black">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
