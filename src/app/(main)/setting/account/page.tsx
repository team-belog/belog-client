"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Button from "@/components/ui/Button";
import AccountNumberField from "@/features/auth/components/register/AccountNumberField";
import BankSelectField from "@/features/auth/components/register/BankSelectField";
import { useGetMyBankAccount } from "@/features/my/hooks/useGetMyBankAccount";
import { useUpdateMyBankAccount } from "@/features/my/hooks/useUpdateMyBankAccount";
import type { BankCode } from "@/features/auth/types";

export default function AccountManagePage() {
  const router = useRouter();
  const { data: bankAccount } = useGetMyBankAccount();
  const { mutate: updateBankAccount, isPending } = useUpdateMyBankAccount();

  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    if (bankAccount) {
      setBank(bankAccount.bankCode);
      setAccountNumber(bankAccount.accountNumber);
    }
  }, [bankAccount]);

  const isChanged =
    bank !== (bankAccount?.bankCode ?? "") ||
    accountNumber !== (bankAccount?.accountNumber ?? "");

  const isValid = bank !== "" && accountNumber !== "" && isChanged;

  const handleSave = () => {
    updateBankAccount(
      { bankCode: bank as BankCode, accountNumber },
      { onSuccess: () => router.back() }
    );
  };

  return (
    <main className="pt-[60px]">
      <BackHeader title="계좌 관리" />
      <Divider />
      <div className="flex flex-col gap-[30px] pt-[22px]">
        <p className="pl-4 pretendard-m-15 text-sub-gray-2 leading-[22px]">등록한 계좌는 정산 화면에서<br />상대방이 복사해 바로 송금할 수 있어요</p>
        <BankSelectField value={bank} onChange={setBank} />
        <AccountNumberField value={accountNumber} onChange={setAccountNumber} />
      </div>
      <Button variant="primary" disabled={!isValid || isPending} onClick={handleSave} className="fixed bottom-0">
        {isPending ? "저장 중..." : "저장하기"}
      </Button>
    </main>
  );
}
