interface GroupDeleteModalProps {
  groupName: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function GroupDeleteModal({ groupName, onCancel, onConfirm }: GroupDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65">
      <div className="relative h-[200px] w-[310px] rounded-[12px] bg-main-white">
        <div className="absolute left-1/2 top-[48px] flex w-[167px] -translate-x-1/2 flex-col items-center gap-2 text-center">
          <p className="pretendard-m-15 text-main-black">그룹을 삭제하시겠습니까?</p>
          <p className="pretendard-m-15 whitespace-nowrap text-sub-gray-2">
            &quot;{groupName}&quot; 삭제하기
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
