"use client";

interface ModalProps {
  isOpen: boolean;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  confirmVariant?: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal({
  isOpen,
  message,
  confirmLabel,
  cancelLabel = "취소",
  confirmVariant = "primary",
  onConfirm,
  onCancel,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50"
      onClick={onCancel}
    >
      <div
        className="mx-4 w-[310px] rounded-[12px] bg-white px-5 pb-5 pt-[61px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="pretendard-m-15 mb-[30px] text-center text-main-black">{message}</p>
        <div className="flex gap-[10px]">
          <button
            type="button"
            onClick={onCancel}
            className="pretendard-m-15 flex h-[42px] flex-1 items-center justify-center rounded-[8px] bg-[#F7F8F9] text-sub-gray-2"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`pretendard-m-15 flex h-[42px] flex-1 items-center justify-center rounded-[8px] text-white ${confirmVariant === "danger" ? "bg-[#FF3B3B]" : "bg-main-mint"}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
