"use client";

import { useRouter } from "next/navigation";

import PreLogAddView from "@/features/pre-log/components/PreLogAddView";
import { useCreatePreLogPlan } from "@/features/pre-log/hooks/useCreatePreLogPlan";

export default function PreLogAddContainer({ meetingId }: { meetingId: number }) {
  const router = useRouter();
  const createPlan = useCreatePreLogPlan(meetingId);

  return (
    <PreLogAddView
      isSubmitting={createPlan.isPending}
      errorMessage={createPlan.error?.message}
      onSubmit={(body) =>
        createPlan.mutate(body, { onSuccess: () => router.back() })
      }
    />
  );
}
