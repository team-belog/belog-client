import Profile from "@/components/ui/Profile";

interface BillItemProps {
  name: string;
  amount: string;
  profileSrc?: string;
  isPayer?: boolean
}

export default function BillItem({ name, amount, profileSrc, isPayer = false }: BillItemProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-[12px] bg-sub-white-2 px-[13px] py-[14px]">
      <div className="flex items-center gap-[8px]">
        {profileSrc !== undefined && (
          <Profile src={profileSrc} width={32} height={32} />
        )}
        <p className="pretendard-m-16 text-sub-black">{name}</p>
        {isPayer && (
            <span className="pretendard-m-12 inline-flex h-[20px] items-center rounded-[20px] bg-main-mint px-[8px] text-main-white">
              결제자
            </span>
          )}
      </div>
      <p className="pretendard-sb-16 text-main-black">{amount}</p>
    </div>
  );
}
