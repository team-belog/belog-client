import Image from "next/image";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const remaining = total - current;
  const percent = total === 0 ? 0 : Math.min(current / total, 1);
  const isFlipped = percent > 0.8;
  const mascotLeft = `min(calc(${percent * 100}% - 12px), calc(100% - 24px))`;

  const getProgressText = () => {
    if (remaining === 0) return "모두 정산했어요 !";
    if (remaining === total) return "아무도 정산을 안했어요 !";
    return `아직 ${remaining}명이 정산을 안했어요 !`;
  };

  return (
    <div className="w-full py-[14px]">
      <div className="relative mb-2 h-[26px]">
        <div
          className={`absolute bottom-0 inline-flex items-center bg-[rgba(73,212,182,0.1)] px-[15px] py-[6px] rounded-tl-[12px] rounded-tr-[12px] ${isFlipped ? "rounded-bl-[12px]" : "rounded-br-[12px]"}`}
          style={
            isFlipped
              ? { right: `calc(100% - 17px - (100% - 34px) * ${percent})` }
              : { left: `calc(17px + (100% - 34px) * ${percent})` }
          }>
          <p className="whitespace-nowrap text-[#1FBA98] font-semibold text-[12px]">
            {getProgressText()}
          </p>
        </div>
      </div>
      <div className="relative h-[15px]">
        <div className="absolute inset-0 rounded-full bg-[#dfe1e5]" />
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${percent * 100}%`,
            background: "linear-gradient(to right, #2edbb5, #88fce3)",
          }}
        />
        <div className="absolute top-[-4px]" style={{ left: mascotLeft }}>
          <Image
            src="/icons/bill-log/progress-indicator.svg"
            alt="인디케이터 아이콘"
            width={24}
            height={22}
          />
        </div>
      </div>
    </div>
  );
}
