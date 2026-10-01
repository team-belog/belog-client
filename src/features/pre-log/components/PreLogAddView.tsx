"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import TabBar from "@/components/ui/TabBar";
import PreLogTagSelector from "@/features/pre-log/components/PreLogTagSelector";
import type { PreLogCategory } from "@/features/pre-log/types";

export type PreLogAddPayload = {
  category: PreLogCategory;
  title: string;
  url?: string;
  content?: string;
};

interface PreLogAddViewProps {
  onCancel?: () => void;
  onSubmit?: (payload: PreLogAddPayload) => void;
}

const MODE_TABS = ["링크", "메모"];

export default function PreLogAddView({ onCancel, onSubmit }: PreLogAddViewProps) {
  const router = useRouter();
  const [modeIndex, setModeIndex] = useState(0);
  const [category, setCategory] = useState<PreLogCategory>("restaurant");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const isLinkMode = modeIndex === 0;
  const isValid = title.trim() !== "" && (isLinkMode ? url.trim() !== "" : content.trim() !== "");

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    const payload: PreLogAddPayload = isLinkMode
      ? { category, title: title.trim(), url: url.trim() }
      : { category, title: title.trim(), content: content.trim() };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      router.back();
    }
  };

  return (
    <main className="pb-[130px]">
      <BackHeader title="계획 추가" onBack={handleCancel} />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <TabBar tabs={MODE_TABS} activeIndex={modeIndex} onChange={setModeIndex} />

      <div className="mt-5 flex flex-col gap-[30px]">
        <PreLogTagSelector value={category} onChange={setCategory} />

        <InputField label="제목" placeholder="예) 식당 링크" value={title} onChange={setTitle} />

        {isLinkMode ? (
          <InputField label="URL" placeholder="https://..." value={url} onChange={setUrl} />
        ) : (
          <InputField
            label="내용"
            placeholder="메모를 입력해주세요"
            value={content}
            onChange={setContent}
          />
        )}
      </div>

      <div className="fixed bottom-0 left-0 flex w-full items-center gap-3 bg-white px-4 py-[28px]">
        <Button
          variant="tertiary"
          disabled={false}
          bare
          onClick={handleCancel}
          className="w-[114px] shrink-0"
        >
          취소
        </Button>
        <Button variant="primary" disabled={!isValid} bare onClick={handleSubmit} className="flex-1">
          추가
        </Button>
      </div>
    </main>
  );
}
