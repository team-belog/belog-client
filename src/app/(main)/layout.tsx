"use client";

import { usePathname } from "next/navigation";

import BottomNav, { hasBottomNav } from "@/components/layout/BottomNav";
import { useAuthGuard } from "@/features/auth/hooks/useAuthGuard";
import { usePushNotification } from "@/features/notification/hooks/usePushNotification";
import { useCaptureInstallPrompt } from "@/features/pwa/hooks/useCaptureInstallPrompt";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useAuthGuard();

  if (!isAuthenticated) return null;

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
}

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  usePushNotification();
  useCaptureInstallPrompt();
  const showBottomNav = hasBottomNav(pathname);

  return (
    <div className={`relative min-h-screen ${showBottomNav ? "pb-24" : ""}`}>
      {children}
      {showBottomNav && <BottomNav />}
    </div>
  );
}
