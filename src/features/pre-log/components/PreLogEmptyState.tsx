import Image from "next/image";

export default function PreLogEmptyState() {
  return (
    <div className="flex flex-col items-center gap-[15px] py-[60px]">
      <div className="relative size-[134px]">
        <Image
          src="/images/empty.svg"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>
      <p className="pretendard-m-15 text-sub-gray-2">
        아직 등록한 계획이 없어요
      </p>
    </div>
  );
}
