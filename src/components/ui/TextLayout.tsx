interface TextLayoutProps {
  left: string;
  right?: string;
}

export default function TextLayout({ left, right }: TextLayoutProps) {
  return (
    <div className="pretendard-sb-16 flex w-full items-center justify-between text-main-black p-[17px]">
      <p>{left}</p>
      {right && <p>{right}</p>}
    </div>
  );
}
