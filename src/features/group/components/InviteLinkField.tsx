"use client";

import { useState } from "react";

interface InviteLinkFieldProps {
  link: string;
}

export default function InviteLinkField({ link }: InviteLinkFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 클립보드 접근 권한이 없는 환경에서는 무시
    }
  };

  return (
    <div className="mx-4 flex h-[64px] items-center justify-between gap-[10px] rounded-[12px] bg-[#F7F8F9] pl-[15px] pr-[15px]">
      <p className="pretendard-m-15 min-w-0 flex-1 truncate text-main-black">
        {link}
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="pretendard-m-15 shrink-0 rounded-[100px] border border-sub-gray-3 bg-sub-white px-[15px] py-[6px] text-sub-gray-2"
      >
        {copied ? "복사됨" : "복사"}
      </button>
    </div>
  );
}
