interface Step3Props {
  onNext: () => void;
}

export default function Step3({ onNext }: Step3Props) {
  return (
    <div className="flex flex-col">
      <h1 className="pretendard-sb-20 ml-4 mt-[10px]">Step 3</h1>
    </div>
  );
}
