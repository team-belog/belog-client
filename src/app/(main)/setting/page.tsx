"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Modal from "@/components/ui/Modal";
import ChevronIcon from "@/components/ui/ChevronIcon";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useWithdrawAccount } from "@/features/auth/hooks/useWithdrawAccount";

function SwitchToggle({ checked = false, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-[30px] w-[60px] rounded-full transition-colors duration-200 ${checked ? "bg-main-mint" : "bg-sub-gray-3"}`}
    >
      <span
        className={`absolute top-[4px] size-[22px] rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-[3px]" : "translate-x-[-25px]"}`}
      />
    </button>
  );
}

function SettingRow({ label, children, account, onClick }: { label: string; children?: React.ReactNode; account?: boolean; onClick?: () => void }) {
  const router = useRouter();

  return (
    <div
      className="flex h-[62px] items-center justify-between px-4 border-b border-gray-300 cursor-pointer"
      onClick={onClick}
    >
      <p className="pretendard-m-15 text-main-black">{label}</p>
      {account && (
        <button type="button" aria-label="계정 설정" onClick={() => router.push("/setting/account")}>
          <ChevronIcon width={26} height={32} scale={0.7} className="text-sub-gray-2" />
        </button>
      )}
      {children}
    </div>
  );
}

export default function SettingPage() {
  const { mutate: logout } = useLogout();
  const { mutate: withdraw, isPending: isWithdrawing } = useWithdrawAccount();
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [modal, setModal] = useState<"logout" | "withdraw" | null>(null);

  return (
    <main className="flex flex-col">
      <BackHeader title="설정" />
      <Divider />
      <SettingRow label="알림 설정">
        <SwitchToggle checked={notificationEnabled} onChange={setNotificationEnabled} />
      </SettingRow>
      <SettingRow label="계좌 관리" account={true} />
      <SettingRow label="로그아웃" onClick={() => setModal("logout")} />
      <SettingRow label="회원 탈퇴" onClick={() => setModal("withdraw")} />

      <Modal
        isOpen={modal === "logout"}
        message="로그아웃 하시겠습니까?"
        confirmLabel="로그아웃"
        onConfirm={() => logout()}
        onCancel={() => setModal(null)}
      />
      <Modal
        isOpen={modal === "withdraw"}
        message="회원 탈퇴 하시겠습니까?"
        confirmLabel={isWithdrawing ? "처리 중..." : "탈퇴"}
        confirmVariant="danger"
        onConfirm={() => withdraw()}
        onCancel={() => setModal(null)}
      />
    </main>
  );
}
