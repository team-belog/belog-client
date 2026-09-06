import Image from "next/image";

import BelogIcon from "@/components/ui/BelogIcon";

export default function BelogLogo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <BelogIcon />
      <Image
        src="/icons/belog-wordmark.svg"
        alt="BELOG"
        width={164}
        height={36}
        priority
      />
    </div>
  );
}
