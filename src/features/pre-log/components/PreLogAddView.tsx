"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import TabBar from "@/components/ui/TabBar";
import PreLogTagSelector from "@/features/pre-log/components/PreLogTagSelector";
import type {
  CreatePreLogPlanRequest,
  PreLogCategory,
} from "@/features/pre-log/types";
import { isSupportedMapUrl } from "@/features/pre-log/utils/mapUrl";

interface PreLogAddViewProps {
  isSubmitting?: boolean;
  errorMessage?: string;
  onCancel?: () => void;
  onSubmit?: (body: CreatePreLogPlanRequest) => void;
}

const MODE_TABS = ["위치", "메모"];

export default function PreLogAddView({
  isSubmitting = false,
  errorMessage,
  onCancel,
  onSubmit,
}: PreLogAddViewProps) {
  const router = useRouter();
  const [modeIndex, setModeIndex] = useState(0);
  const [category, setCategory] = useState<PreLogCategory>("RESTAURANT");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");

  const isLinkMode = modeIndex === 0;
  // 입력 중에는 에러를 띄우지 않도록 값이 있을 때만 형식 검사
  const isUrlInvalid = url.trim() !== "" && !isSupportedMapUrl(url);
  const isValid =
    title.trim() !== "" &&
    (isLinkMode ? url.trim() !== "" && !isUrlInvalid : content.trim() !== "");

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const handleSubmit = () => {
    if (isSubmitting) return;

    const body: CreatePreLogPlanRequest = isLinkMode
      ? { type: "LOCATION", category, title: title.trim(), url: url.trim() }
      : { type: "MEMO", category, title: title.trim(), content: content.trim() };

    if (onSubmit) {
      onSubmit(body);
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
          <InputField
            label="URL"
            description="지도 내 위치 표시는 카카오맵과 구글지도 링크만 지원해요."
            placeholder="https://..."
            value={url}
            onChange={setUrl}
            errorMessage={isUrlInvalid ? "카카오맵 또는 구글지도 링크만 등록할 수 있어요." : undefined}
          />
        ) : (
          <InputField
            label="내용"
            placeholder="메모를 입력해주세요"
            value={content}
            onChange={setContent}
          />
        )}

        {errorMessage && (
          <p className="pretendard-m-12 px-4 text-red-500">{errorMessage}</p>
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
        <Button variant="primary" disabled={!isValid || isSubmitting} bare onClick={handleSubmit} className="flex-1">
          추가
        </Button>
      </div>
    </main>
  );
}
