interface StepProgressBarProps {
  current: number;
  total: number;
}

export default function StepProgressBar({ current, total }: StepProgressBarProps) {
  return (
    <div className="flex w-full items-center gap-[12px] px-4 py-[14px]">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-[6px] flex-1 rounded-full"
          style={{ backgroundColor: i < current ? "#49D4B6" : "#F2F5F8" }}
        />
      ))}
    </div>
  );
}
