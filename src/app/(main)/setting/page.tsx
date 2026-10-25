"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import Modal from "@/components/ui/Modal";
import ChevronIcon from "@/components/ui/ChevronIcon";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useWithdrawAccount } from "@/features/auth/hooks/useWithdrawAccount";
import { useNotificationSettings } from "@/features/notification/hooks/useNotificationSettings";
import { useUpdateNotificationSettings } from "@/features/notification/hooks/useUpdateNotificationSettings";
import { isPushSupported, registerPushDevice } from "@/features/notification/utils/pushDevice";

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
  const { data: notificationSettings } = useNotificationSettings();
  const { mutate: updateNotificationSettings } = useUpdateNotificationSettings();
  const [modal, setModal] = useState<"logout" | "withdraw" | null>(null);
  // 웹 푸시 미지원 환경(iOS Safari 탭 등)은 "unsupported"
  const [pushPermission, setPushPermission] = useState<NotificationPermission | "unsupported" | null>(null);

  // SSR에는 Notification이 없으므로 마운트 후에 읽음
  useEffect(() => {
    setPushPermission(isPushSupported() ? Notification.permission : "unsupported");
  }, []);

  // 서버 수신 설정과 브라우저 권한이 둘 다 켜져 있어야 푸시를 받을 수 있음
  const notificationEnabled =
    (notificationSettings?.pushNotificationEnabled ?? false) &&
    (pushPermission === "granted" || pushPermission === "unsupported");

  const handleNotificationToggle = async (enabled: boolean) => {
    if (!enabled || pushPermission === "unsupported") {
      updateNotificationSettings({ pushNotificationEnabled: enabled });
      return;
    }

    // iOS는 사용자 클릭 중에만 권한을 요청할 수 있음
    const permission =
      Notification.permission === "default"
        ? await Notification.requestPermission()
        : Notification.permission;
    setPushPermission(permission);

    // 거부하면 토글은 꺼진 채로 두고 서버 설정도 바꾸지 않음
    if (permission !== "granted") return;

    updateNotificationSettings({ pushNotificationEnabled: true });
    registerPushDevice().catch(() => {});
  };

  return (
    <main className="flex flex-col pt-[60px]">
      <BackHeader title="설정" />
      <Divider />
      <SettingRow label="알림 설정">
        <SwitchToggle
          checked={notificationEnabled}
          onChange={handleNotificationToggle}
        />
      </SettingRow>
      {pushPermission === "denied" && (
        <p className="pretendard-m-12 px-4 pt-2 text-sub-gray-2">
          브라우저 알림 권한이 차단돼 있어요. 브라우저 설정에서 알림을 허용해 주세요.
        </p>
      )}
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
