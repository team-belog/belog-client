export default function PreLogEndedNotice() {
  return (
    <div className="mx-4 mt-[30px] flex flex-col gap-[10px] rounded-[12px] bg-main-cool-gray px-5 pb-[21px] pt-5">
      <p className="pretendard-m-15 text-main-black">종료된 모임이에요</p>
      <p className="pretendard-m-14 text-sub-gray-2">
        열람만 가능하며 새로운 계획은 등록할 수 없어요
      </p>
    </div>
  );
}
