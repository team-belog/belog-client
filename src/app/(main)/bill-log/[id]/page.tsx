"use client";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Toggle from "@/components/ui/Toggle";
import Receipt from "@/features/bill-log/components/Receipt";
import { DUMMY_RECEIPT } from "@/features/bill-log/constants/dummy";

export default function BillDetailPage() {
  return (
    <main className="">
      <BackHeader title="영수증" />
      <Divider />
      <div className="flex flex-col gap-6 p-4 pt-5">
        <Toggle label={DUMMY_RECEIPT.date} variant="outlined" />
        <Receipt
          title={DUMMY_RECEIPT.title}
          payer={DUMMY_RECEIPT.payer}
          settlementMethod={DUMMY_RECEIPT.settlementMethod}
          items={DUMMY_RECEIPT.items}
          totalAmount={DUMMY_RECEIPT.totalAmount}
          settlementPersons={DUMMY_RECEIPT.settlementPersons}
        />
      </div>
    </main>
  );
}
