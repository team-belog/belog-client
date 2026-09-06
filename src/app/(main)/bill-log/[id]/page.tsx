"use client";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Toggle from "@/components/ui/Toggle";
import Receipt from "@/features/bill-log/components/Receipt";

const DUMMY_RECEIPT = {
  date: "Day 01 (2026.08.06)",
  title: "아랑이 카페",
  payer: "정바미",
  settlementMethod: "3분의 1",
  items: [
    { id: 1, name: "아메리카노", amount: "4,000원" },
    { id: 2, name: "프라푸치노", amount: "7,000원" },
  ],
  totalAmount: "11,000원",
  settlementPersons: [
    { id: 1, name: "정바미", amount: "4,000원", isPayer: true },
    { id: 2, name: "바비", amount: "7,000원" },
  ],
};

export default function BillDetailPage() {
  return (
    <main className="">
      <BackHeader title="영수증" />
      <Divider />
      <div className="flex flex-col gap-6 p-4 pt-5">
        <Toggle label={DUMMY_RECEIPT.date} variant="outlined" />
      </div>
    </main>
  );
}
