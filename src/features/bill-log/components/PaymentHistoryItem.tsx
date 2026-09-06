import Image from "next/image";

interface PaymentHistoryItemProps {
  thumbnailUrl: string;
  name: string;
  amount: string;
  payer: string;
  onClick: () => void;
}

export default function PaymentHistoryItem({
  thumbnailUrl,
  name,
  amount,
  payer,
  onClick,
}: PaymentHistoryItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between px-[18px] py-[17px]"
    >
      <div className="flex items-center gap-2">
        <div className="relative size-[53px] bg-gray-100 shrink-0 overflow-hidden rounded-[9px]">
          <Image src={thumbnailUrl} alt={name} fill className="object-cover" />
        </div>
        <div className="flex flex-col items-start gap-[7px]">
          <p className="pretendard-sb-16 text-main-black">{name}</p>
          <div className="flex items-center gap-[5px] text-sub-gray-1">
            <p className="pretendard-m-16">{amount}</p>
            <p className="pretendard-m-12">|</p>
            <p className="pretendard-m-14">{payer} 결제</p>
          </div>
        </div>
      </div>
      <Image
        src="/icons/bill-log/chevron-right.svg"
        alt="상세보기"
        width={18}
        height={18}
      />
    </button>
  );
}
