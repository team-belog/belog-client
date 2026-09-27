"use client";

import { usePathname } from "next/navigation";

import BottomNav, { BOTTOM_NAV_PATHS } from "@/components/layout/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showBottomNav = (BOTTOM_NAV_PATHS as readonly string[]).includes(pathname);

  return (
    <div className={`relative min-h-screen ${showBottomNav ? "pb-24" : ""}`}>
      {children}
      {showBottomNav && <BottomNav />}
    </div>
  );
}
