import BelogIcon from "@/components/ui/BelogIcon";

interface PwaAppLogoProps {
  size: number;
  bordered?: boolean;
  radius?: number;
}

export default function PwaAppLogo({ size, bordered = false, radius = 16 }: PwaAppLogoProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center bg-main-cool-gray ${bordered ? "border border-[#E3E7EF]" : ""}`}
      style={{ width: size, height: size, borderRadius: radius }}
    >
      <BelogIcon width={size * 0.628} height={size * 0.598} />
    </div>
  );
}
