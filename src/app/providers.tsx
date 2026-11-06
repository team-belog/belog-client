"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { initAmplitude } from "@/lib/amplitude";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initAmplitude();
  }, []);

  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1, staleTime: 60_000 } },
      }),
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
