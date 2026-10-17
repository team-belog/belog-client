import Image from "next/image";

export default function GroupCreatedNotice() {
  return (
    <div className="flex flex-col items-center gap-[15px] px-4 text-center">
      <Image
        src="/icons/group/created-check.svg"
        alt=""
        width={50}
        height={50}
      />
      <p className="pretendard-sb-18 text-main-black">그룹이 생성됐어요</p>
      <p className="pretendard-m-15 text-sub-gray-2">
        모임 상세에서 계획을 정리하거나
        <br />
        모임 당일 정산을 진행할 수 있어요
      </p>
    </div>
  );
}
