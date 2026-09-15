interface InviteCodeBoxesProps {
  code: string;
}

export default function InviteCodeBoxes({ code }: InviteCodeBoxesProps) {
  return (
    <div className="flex justify-center gap-[10px]">
      {code.split("").map((char, index) => (
        <div
          key={index}
          className="flex h-[46px] w-[42px] items-center justify-center rounded-[10px] bg-[#F7F8F9]"
        >
          <p className="pretendard-sb-20 text-main-black">{char}</p>
        </div>
      ))}
    </div>
  );
}
