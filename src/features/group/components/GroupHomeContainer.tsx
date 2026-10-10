"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import GroupHomeView from "@/features/group/components/GroupHomeView";
import { useDeleteGroup } from "@/features/group/hooks/useDeleteGroup";
import { useGroupDetail } from "@/features/group/hooks/useGroupDetail";
import { useGroupMembers } from "@/features/group/hooks/useGroupMembers";
import { usePastMeetings } from "@/features/group/hooks/usePastMeetings";
import { useUpdateGroupCoverImage } from "@/features/group/hooks/useUpdateGroupCoverImage";

export default function GroupHomeContainer({ groupId }: { groupId: number }) {
  const { data, isPending, isError, error, refetch } = useGroupDetail(groupId);
  // 멤버와 지난 만남은 각자 로딩되며, 실패해도 그룹 홈은 그대로 보여준다
  const { data: members } = useGroupMembers(groupId);
  const {
    data: pastMeetings,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePastMeetings(groupId);
  const updateCoverImage = useUpdateGroupCoverImage(groupId);
  const deleteGroup = useDeleteGroup();
  const router = useRouter();

  const ownerNickname = members?.items.find(
    (member) => member.role === "OWNER",
  )?.nickname;

  const handleDeleteGroup = () => {
    deleteGroup.mutate(groupId, {
      onSuccess: () => router.replace("/group"),
    });
  };

  const handleLoadMorePastMeetings = useCallback(() => {
    if (!isFetchingNextPage) fetchNextPage();
  }, [isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <p className="pretendard-m-15 pt-[25px] text-center text-sub-gray-2">
        불러오는 중...
      </p>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 pt-[25px]">
        <p className="pretendard-m-15 text-sub-gray-2">{error.message}</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="pretendard-m-15 text-main-black underline"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <GroupHomeView
      group={data}
      ownerNickname={ownerNickname}
      pastMeetings={pastMeetings}
      hasMorePastMeetings={hasNextPage}
      onLoadMorePastMeetings={handleLoadMorePastMeetings}
      isUpdatingCoverImage={updateCoverImage.isPending}
      coverImageErrorMessage={updateCoverImage.error?.message}
      onChangeCoverImage={updateCoverImage.mutate}
      isDeletingGroup={deleteGroup.isPending}
      deleteGroupErrorMessage={deleteGroup.error?.message}
      onDeleteGroup={handleDeleteGroup}
      onCancelDeleteGroup={deleteGroup.reset}
    />
  );
}
