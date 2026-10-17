import BelogIcon from "@/components/ui/BelogIcon";

interface PwaAppLogoProps {
  size: number;
  bordered?: boolean;
}

export default function PwaAppLogo({ size, bordered = false }: PwaAppLogoProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-[16px] bg-main-cool-gray ${bordered ? "border border-[#E3E7EF]" : ""}`}
      style={{ width: size, height: size }}
    >
      <BelogIcon width={size * 0.628} height={size * 0.598} />
    </div>
  );
}
