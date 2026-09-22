interface TrashIconProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "default" | "header";
}

export default function TrashIcon({
  width,
  height,
  className,
  variant = "default",
}: TrashIconProps) {
  if (variant === "header") {
    return (
      <svg
        width={width ?? 18}
        height={height ?? 20}
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M1 5H17M7 9V15M11 9V15M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width={width ?? 16}
      height={height ?? 17}
      viewBox="0 0 15.62 17.3482"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M0.897321 4.35367H14.7227M6.08184 7.81002V12.9945M9.53819 7.81002V12.9945M1.76141 4.35367L2.6255 14.7227C2.6255 15.1811 2.80757 15.6206 3.13167 15.9447C3.45576 16.2688 3.89533 16.4509 4.35367 16.4509H11.2664C11.7247 16.4509 12.1643 16.2688 12.4884 15.9447C12.8125 15.6206 12.9945 15.1811 12.9945 14.7227L13.8586 4.35367M5.21776 4.35367V1.76141C5.21776 1.53224 5.30879 1.31245 5.47084 1.15041C5.63289 0.988359 5.85267 0.897321 6.08184 0.897321H9.53819C9.76736 0.897321 9.98715 0.988359 10.1492 1.15041C10.3112 1.31245 10.4023 1.53224 10.4023 1.76141V4.35367"
        stroke="currentColor"
        strokeWidth="1.79464"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
