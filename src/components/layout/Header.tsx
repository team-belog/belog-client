"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import BelogIcon from "@/components/ui/BelogIcon";

interface HeaderProps {
  onSettingClick?: () => void;
  onAlarmClick?: () => void;
}

export default function Header({ onSettingClick, onAlarmClick }: HeaderProps) {
  const router = useRouter();

  const handleSetting = () => {
    if (onSettingClick) {
      onSettingClick();
    } else {
      router.push("/setting");
    }
  };

  const handleAlarm = () => {
    if (onAlarmClick) {
      onAlarmClick();
    } else {
      router.push("/notification");
    }
  };

  return (
    <header className="flex h-[60px] w-full items-center justify-between bg-white px-4">
      {/* 로고 */}
      <div className="flex items-center gap-[3px]">
        <BelogIcon width={16} height={15} />
        <Image
          src="/icons/belog-wordmark.svg"
          alt="BELOG"
          width={70}
          height={15}
          priority
        />
      </div>

      {/* 설정 / 알림 */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSetting}
          aria-label="설정"
          className="flex size-[30px] items-center justify-center"
        >
          <Image src="/icons/home/setting.svg" alt="" width={24} height={24} />
        </button>

        <button
          type="button"
          onClick={handleAlarm}
          aria-label="알림"
          className="relative size-[30px]"
        >
          <Image
            src="/icons/home/bell.svg"
            alt=""
            width={20}
            height={25}
            className="absolute left-[5px] top-[3px]"
          />
          <Image
            src="/icons/home/bell-dot.svg"
            alt=""
            width={7}
            height={7}
            className="absolute right-[3px] top-[6px]"
          />
        </button>
      </div>
    </header>
  );
}
