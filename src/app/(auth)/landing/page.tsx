import BelogLogo from "@/features/auth/components/BelogLogo";
import LandingCta from "@/features/auth/components/LandingCta";
import LandingIntro from "@/features/auth/components/LandingIntro";

export default function LandingPage() {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center bg-white pb-[35px]">
        <div className="flex flex-1 flex-col items-center justify-center gap-[30px]">
          <BelogLogo />
          <LandingIntro />
        </div>
        <LandingCta />
      </div>
    </main>
  );
}
