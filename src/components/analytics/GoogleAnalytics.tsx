"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";
import {
  normalizeAnalyticsPath,
  trackGoogleAnalyticsPageView,
} from "@/lib/googleAnalytics";

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    trackGoogleAnalyticsPageView(measurementId, pathname, search);
  }, [measurementId, pathname, search]);

  if (!normalizeAnalyticsPath(pathname)) return null;

  return (
    <Script
      id="belog-google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
    />
  );
}
