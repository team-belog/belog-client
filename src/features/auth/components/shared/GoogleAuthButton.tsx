"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";

export default function GoogleAuthButton() {
  const handleGoogleLogin = () => {
    // TODO
  };

  return (
    <div className="flex w-full flex-col items-center">
      <Button
        variant="tertiary"
        disabled={false}
        onClick={handleGoogleLogin}
        className="pb-[20px]"
      >
        <Image
          src="/icons/auth/google-logo.svg"
          alt="Google Icon"
          width={24}
          height={24}
        />
        구글로 계속하기
      </Button>
    </div>
  );
}
