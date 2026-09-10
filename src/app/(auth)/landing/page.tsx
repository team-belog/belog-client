import AuthIntro from "@/features/auth/components/shared/AuthIntro";
import BelogLogo from "@/features/auth/components/shared/BelogLogo";
import StartButton from "@/features/auth/components/landing/StartButton";
import LoginPrompt from "@/features/auth/components/shared/LoginPrompt";

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center pb-[35px]">
      <div className="flex flex-1 flex-col items-center justify-center gap-[30px]">
        <BelogLogo />
        <AuthIntro />
      </div>
      <StartButton />
      <LoginPrompt />
    </main>
  );
}
