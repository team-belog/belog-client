import BelogIcon from "@/components/ui/BelogIcon";

const MENU_ITEMS = [
  { key: "create", label: "그룹 생성" },
  { key: "join", label: "초대코드로 참여" },
] as const;

interface OnboardingFabMenuProps {
  highlighted: (typeof MENU_ITEMS)[number]["key"];
  // 플로팅 버튼 왼쪽 위를 기준으로 배치되는 안내 문구, 화살표
  children?: React.ReactNode;
}

// HomeFab이 열린 상태를 같은 위치에 그려 메뉴 항목을 강조
export default function OnboardingFabMenu({ highlighted, children }: OnboardingFabMenuProps) {
  return (
    <div className="absolute bottom-20 right-4 size-[60px]">
      {children}

      <div className="absolute bottom-[68px] right-0 flex h-[115px] w-[161px] flex-col rounded-[12px] bg-main-white p-2">
        {MENU_ITEMS.map(({ key, label }) => (
          <div
            key={key}
            className={`pretendard-m-15 flex items-center justify-center rounded-[12px] text-main-black ${
              key === highlighted ? "bg-main-mint/20" : ""
            } ${key === "create" ? "h-[47.586px]" : "flex-1"}`}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="relative size-[60px] overflow-hidden rounded-full bg-main-white shadow-[0_0_5px_0_rgba(0,0,0,0.05)]">
        <span className="absolute left-[17.5px] top-[22px]">
          <BelogIcon width={41.349} height={39.247} />
        </span>
      </div>
    </div>
  );
}
