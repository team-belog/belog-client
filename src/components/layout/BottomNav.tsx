"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "홈", href: "/" },
  { label: "그룹", href: "/group" },
  { label: "마이", href: "/my" },
] as const;

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 border-t border-gray-200 bg-white">
      {NAV_ITEMS.map(({ label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-1 text-sm transition-colors ${
              isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <span className="font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
