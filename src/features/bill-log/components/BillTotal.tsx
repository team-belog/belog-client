interface BillTotalProps {
  label?: string;
  amount: string;
}

export default function BillTotal({ label = "합계", amount }: BillTotalProps) {
  return (
    <div className="flex w-full flex-col gap-[24px]">
      <div className="h-px w-full"
        style={{
          backgroundImage: "repeating-linear-gradient(to right, #A6A6A6 0, #A6A6A6 6px, transparent 6px, transparent 14px)",
        }}/>
      <div className="flex w-full items-center justify-between">
        <p className="pretendard-sb-20 text-main-black">{label}</p>
        <p className="pretendard-sb-20 text-main-mint">{amount}</p>
      </div>
    </div>
  );
}
