interface MeetupEndModalProps {
  meetingName: string;
  isEnding?: boolean;
  errorMessage?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function MeetupEndModal({
  meetingName,
  isEnding = false,
  errorMessage,
  onCancel,
  onConfirm,
}: MeetupEndModalProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65">
      <div className="relative h-[200px] w-[310px] rounded-[12px] bg-main-white">
        <div className="absolute left-1/2 top-[48px] flex w-[270px] -translate-x-1/2 flex-col items-center gap-2 text-center">
          <p className="pretendard-m-15 text-main-black">
            {meetingName} 만남을
            <br />
            종료하시겠습니까?
          </p>
          {errorMessage ? (
            <p className="pretendard-m-12 text-red-500">{errorMessage}</p>
          ) : (
            <p className="pretendard-m-15 whitespace-nowrap text-sub-gray-2">
              종료한 만남은 되돌릴 수 없어요
            </p>
          )}
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
            disabled={isEnding}
            className="pretendard-m-15 flex w-[130px] items-center justify-center rounded-[8px] border border-main-mint bg-main-mint py-[10px] text-main-white"
          >
            {isEnding ? "종료 중..." : "종료"}
          </button>
        </div>
      </div>
    </div>
  );
}
