interface MeetupMemberRemoveModalProps {
  nickname: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function MeetupMemberRemoveModal({
  nickname,
  onCancel,
  onConfirm,
}: MeetupMemberRemoveModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65">
      <div className="relative h-[200px] w-[310px] rounded-[12px] bg-main-white">
        <div className="absolute left-1/2 top-[48px] flex -translate-x-1/2 flex-col items-center gap-2 text-center">
          <p className="pretendard-m-15 whitespace-nowrap text-main-black">
            {nickname} 님을 삭제하시겠습니까?
          </p>
          <p className="pretendard-m-15 whitespace-nowrap text-sub-gray-2">
            멤버 추가를 통해 다시 되돌릴 수 있어요
          </p>
        </div>

        <div className="absolute left-[20px] top-[136px] flex gap-[10px]">
          <button
            type="button"
            onClick={onCancel}
            className="pretendard-m-15 flex w-[130px] items-center justify-center rounded-[8px] bg-main-cool-gray py-[10px] text-sub-gray-2"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="pretendard-m-15 flex w-[130px] items-center justify-center rounded-[8px] border border-main-mint bg-main-mint py-[10px] text-main-white"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
