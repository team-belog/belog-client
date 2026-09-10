"use client";

import { useSearchParams } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";

export default function BillDetailPage() {
  const searchParams = useSearchParams()
  const photoId = searchParams.get("photoId")
  
  return (
    <main className="flex h-dvh flex-col">
      <BackHeader title="Post-log" />
      <Divider />
      <div className="flex flex-1 items-center justify-center">
        <div className="aspect-square w-full bg-gray-300"></div>
      </div>
      <Button variant="primary" disabled={false} onClick={() => {}}>
        갤러리에 저장
      </Button>
    </main>
  );
}
