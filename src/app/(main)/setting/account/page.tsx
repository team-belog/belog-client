"use client";

import { useState } from "react";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import AccountHolderField from "@/features/auth/components/register/AccountHolderField";
import AccountNumberField from "@/features/auth/components/register/AccountNumberField";
import BankSelectField from "@/features/auth/components/register/BankSelectField";

export default function AccountManagePage() {
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const isValid = bank !== "" && accountNumber !== "" && accountHolder !== "";

  return (
    <main>
      <BackHeader title="계좌 관리" />
      <Divider />
      <div className="flex flex-col gap-[30px] pt-[22px]">
        <p className="pl-4 pretendard-m-15 text-sub-gray-2 leading-[22px]">등록한 계좌는 정산 화면에서<br />상대방이 복사해 바로 송금할 수 있어요</p>
        <BankSelectField value={bank} onChange={setBank} />
        <AccountNumberField value={accountNumber} onChange={setAccountNumber} />
        <AccountHolderField value={accountHolder} onChange={setAccountHolder} />
      </div>
      <Button variant="primary" disabled={!isValid} onClick={() => {}} className="fixed bottom-0">
        저장하기
      </Button>
    </main>
  );
}
