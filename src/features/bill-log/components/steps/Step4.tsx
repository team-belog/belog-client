interface Step4Props {
  onSubmit: () => void;
}

export default function Step4({ onSubmit }: Step4Props) {
  return (
    <div className="flex flex-col">
      <h1 className="pretendard-sb-20 ml-4 mt-[10px]">이대로 정산을 요청할까요?</h1>
    </div>
  );
}
