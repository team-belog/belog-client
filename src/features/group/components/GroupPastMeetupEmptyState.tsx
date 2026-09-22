import Image from "next/image";

export default function GroupPastMeetupEmptyState() {
  return (
    <div className="flex flex-col items-center gap-[15px] py-5">
      <div className="relative size-[134px]">
        <Image
          src="/images/group/empty-meetup.svg"
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>

      <div className="flex flex-col items-center gap-[15px]">
        <p className="pretendard-sb-18 text-main-black">
          아직 지난 만남이 없어요
        </p>
        <p className="pretendard-m-15 text-sub-gray-2">
          지금 바로 새로운 만남을 시작해 볼까요?
        </p>
      </div>
    </div>
  );
}
