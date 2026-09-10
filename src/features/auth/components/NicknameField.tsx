"use client";

import { useState } from "react";

const NICKNAME_MAX = 5;

type NicknameStatus = "idle" | "available" | "unavailable";

const STATUS_MESSAGE: Record<Exclude<NicknameStatus, "idle">, string> = {
  available: "사용 가능한 닉네임입니다",
  unavailable: "사용 불가능한 닉네임입니다",
};

interface NicknameFieldProps {
  value: string;
  onChange: (value: string) => void;
  onAvailableChange?: (available: boolean) => void;
}

export default function NicknameField({
  value,
  onChange,
  onAvailableChange,
}: NicknameFieldProps) {
  const [status, setStatus] = useState<NicknameStatus>("idle");

  const updateStatus = (next: NicknameStatus) => {
    setStatus(next);
    onAvailableChange?.(next === "available");
  };

  const handleChange = (next: string) => {
    onChange(next);
    if (status !== "idle") updateStatus("idle"); // 값이 바뀌면 재확인 필요
  };

  const handleCheck = async () => {
    if (value.length === 0) return;
    // TODO: GET /users/nickname/check?value= 연결
    // const { isDuplicated } = await checkNickname(value);
    const isDuplicated = false;
    updateStatus(isDuplicated ? "unavailable" : "available");
  };

  return (
    <div className="mx-4 flex flex-col gap-[10px]">
      <p className="mt-4 pretendard-sb-16 text-main-black">닉네임</p>
      <div className="flex items-stretch gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            maxLength={NICKNAME_MAX}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="닉네임을 입력하세요"
            className="pretendard-m-15 h-[50px] w-full rounded-[12px] bg-[#F7F8F9] px-[15px] pr-12 text-main-black placeholder:text-sub-gray-2 outline-none focus:ring-1 focus:ring-main-mint"
          />
          <span className="pretendard-m-12 absolute bottom-2 right-3 text-sub-gray-2">
            {value.length}/{NICKNAME_MAX}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCheck}
          disabled={value.length === 0}
          className="pretendard-m-15 w-[84px] shrink-0 rounded-[12px] border border-sub-gray-3 text-main-black disabled:opacity-40"
        >
          중복확인
        </button>
      </div>

      {status !== "idle" && (
        <p
          className={`pretendard-m-12 ${
            status === "available" ? "text-[#2B72F4]" : "text-[#F42B2B]"
          }`}
        >
          {STATUS_MESSAGE[status]}
        </p>
      )}
    </div>
  );
}
