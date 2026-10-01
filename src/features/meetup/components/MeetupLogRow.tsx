import Image from "next/image";

interface MeetupLogRowProps {
  iconSrc: string;
  title: string;
  status: string;
  description: string;
  onClick?: () => void;
}

export default function MeetupLogRow({
  iconSrc,
  title,
  status,
  description,
  onClick,
}: MeetupLogRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between px-4 py-[22px]"
    >
      <div className="flex items-center gap-5">
        <div className="relative size-[50px] shrink-0">
          <Image src={iconSrc} alt="" fill className="object-contain" />
        </div>
        <div className="flex flex-col items-start gap-[15px]">
          <div className="flex items-center gap-2">
            <p className="pretendard-sb-18 text-main-black">{title}</p>
            <span className="pretendard-m-12 rounded-[8px] border border-sub-gray-3 bg-sub-white px-2 py-1 text-sub-gray-2">
              {status}
            </span>
          </div>
          <p className="pretendard-m-14 text-sub-gray-2">{description}</p>
        </div>
      </div>

      <Image src="/icons/bill-log/chevron-right.svg" alt="" width={18} height={18} />
    </button>
  );
}
