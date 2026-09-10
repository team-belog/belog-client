interface GuideFieldProps {
  message: string;
}

export default function GuideField({ message }: GuideFieldProps) {
  return (
    <div className="mx-4 mt-4 rounded-[10px] bg-[#F7F8F9] px-4 py-[17px]">
      <p className="pretendard-m-14 text-center text-sub-gray-2">{message}</p>
    </div>
  );
}
