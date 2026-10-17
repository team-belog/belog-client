import Image from "next/image";

interface PreLogEmptyStateProps {
  message?: string;
  className?: string;
}

export default function PreLogEmptyState({
  message = "아직 등록한 계획이 없어요",
  className = "py-[60px]",
}: PreLogEmptyStateProps) {
  return (
    <div className={`flex flex-col items-center gap-[15px] ${className}`}>
      <div className="relative size-[134px]">
        <Image
          src="/icons/empty-state.svg"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>
      <p className="pretendard-m-15 text-sub-gray-2">{message}</p>
    </div>
  );
}
