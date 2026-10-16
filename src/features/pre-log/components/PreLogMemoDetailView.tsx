"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import BackHeader from "@/components/layout/BackHeader";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import PreLogTagSelector from "@/features/pre-log/components/PreLogTagSelector";
import type {
  PreLogCategory,
  PreLogPlan,
  UpdatePreLogPlanRequest,
} from "@/features/pre-log/types";

interface PreLogMemoDetailViewProps {
  plan: PreLogPlan;
  canEdit: boolean;
  isSubmitting: boolean;
  errorMessage?: string;
  onSubmit: (
    body: UpdatePreLogPlanRequest,
    options?: { onSuccess?: () => void },
  ) => void;
  onCancelEdit: () => void;
}

export default function PreLogMemoDetailView({
  plan,
  canEdit,
  isSubmitting,
  errorMessage,
  onSubmit,
  onCancelEdit,
}: PreLogMemoDetailViewProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  // 상세 조회 API가 없으므로 수정 성공 후에는 보낸 값을 그대로 보여줌
  const [saved, setSaved] = useState({
    category: plan.category,
    title: plan.title,
    content: plan.content ?? "",
  });
  const [category, setCategory] = useState<PreLogCategory>(saved.category);
  const [title, setTitle] = useState(saved.title);
  const [content, setContent] = useState(saved.content);

  const isValid = title.trim() !== "" && content.trim() !== "";
  const isChanged =
    category !== saved.category ||
    title.trim() !== saved.title ||
    content.trim() !== saved.content;

  const resetDraft = () => {
    setCategory(saved.category);
    setTitle(saved.title);
    setContent(saved.content);
  };

  const handleBack = () => {
    if (!isEditing) {
      router.back();
      return;
    }
    resetDraft();
    setIsEditing(false);
    onCancelEdit();
  };

  const handleComplete = () => {
    if (isSubmitting || !isValid) return;

    if (!isChanged) {
      setIsEditing(false);
      return;
    }

    const next = { category, title: title.trim(), content: content.trim() };
    onSubmit(
      { type: "MEMO", ...next },
      {
        onSuccess: () => {
          setSaved(next);
          setIsEditing(false);
        },
      },
    );
  };

  return (
    <main className="pb-[130px]">
      <BackHeader title="메모" onBack={handleBack} />
      <div className="h-2 w-full bg-[#F1F4F9] opacity-50" />

      <div className="mt-5 flex flex-col gap-[30px]">
        <PreLogTagSelector
          value={category}
          onChange={setCategory}
          readOnly={!isEditing}
        />

        <InputField
          label="제목"
          placeholder="예) 식당 링크"
          value={title}
          onChange={setTitle}
          readOnly={!isEditing}
        />

        <InputField
          label="내용"
          placeholder="메모를 입력해주세요"
          value={content}
          onChange={setContent}
          readOnly={!isEditing}
        />

        {isEditing && errorMessage && (
          <p className="pretendard-m-12 px-4 text-red-500">{errorMessage}</p>
        )}
      </div>

      {isEditing ? (
        <Button
          variant="primary"
          disabled={!isValid || isSubmitting}
          onClick={handleComplete}
          className="fixed bottom-0 left-0 right-0"
        >
          완료
        </Button>
      ) : (
        canEdit && (
          <Button
            variant="primary"
            disabled={false}
            onClick={() => setIsEditing(true)}
            className="fixed bottom-0 left-0 right-0"
          >
            수정하기
          </Button>
        )
      )}
    </main>
  );
}
