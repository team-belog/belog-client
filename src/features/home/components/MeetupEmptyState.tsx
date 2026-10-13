interface MeetupEmptyStateProps {
  hasQuery: boolean;
}

export default function MeetupEmptyState({ hasQuery }: MeetupEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[15px] py-[60px]">
      <p className="pretendard-sb-18 text-main-black">
        {hasQuery ? "검색 결과가 없어요" : "아직 등록된 만남이 없어요"}
      </p>
      <p className="pretendard-m-15 text-sub-gray-2">
        {hasQuery ? "다른 검색어로 다시 찾아보세요" : "새로운 만남을 등록해 보세요"}
      </p>
    </div>
  );
}
