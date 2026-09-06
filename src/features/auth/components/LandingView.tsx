import BelogLogo from "@/features/auth/components/BelogLogo";
import LandingCta from "@/features/auth/components/LandingCta";
import LandingIntro from "@/features/auth/components/LandingIntro";

export default function LandingView() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-4 pb-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-[30px]">
        <BelogLogo />
        <LandingIntro />
      </div>
      <LandingCta />
    </div>
  );
}
