"use client";

import { useRouter } from "next/navigation";

import DailyPaymentGroup from "../DailyPaymentGroup";
import { DUMMY_DAILY_PAYMENTS } from "@/features/bill-log/constants/dummy";

export default function PaymentHistoryTab() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      {DUMMY_DAILY_PAYMENTS.map((group) => (
        <DailyPaymentGroup
          key={group.date}
          date={group.date}
          totalAmount={group.totalAmount}
          items={group.items}
          onItemClick={(id) => router.push(`/bill-log/${id}`)}
        />
      ))}
    </div>
  );
}
