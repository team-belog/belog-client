interface ChevronIconProps {
  direction?: "left" | "right";
  /** 아이콘이 차지하는 영역(화살표는 이 영역의 가운데에 그려짐) */
  width?: number;
  height?: number;
  /** 화살표 크기 배율 (1 = 가로 8 × 세로 18) */
  scale?: number;
  strokeWidth?: number;
  /** 색상은 text-* 클래스로 지정 (currentColor) */
  className?: string;
}

export default function ChevronIcon({
  direction = "right",
  width = 10,
  height = 20,
  scale = 1,
  strokeWidth = 2,
  className,
}: ChevronIconProps) {
  const d =
    direction === "right" ? "M-4 -9L4 0L-4 9" : "M4 -9L-4 0L4 9";

  return (
    <svg
      width={width}
      height={height}
      viewBox={`${-width / 2} ${-height / 2} ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d={d}
        transform={`scale(${scale})`}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
