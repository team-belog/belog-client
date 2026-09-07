import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import AuthIntro from "@/features/auth/components/AuthIntro";
import BelogLogo from "@/features/auth/components/BelogLogo";
import GoogleAuthButton from "@/features/auth/components/GoogleAuthButton";
import LoginPrompt from "@/features/auth/components/LoginPrompt";

export default function RegisterPage() {
  return (
    <main className="flex flex-1 flex-col items-center pb-[35px]">
      <BackHeader title="회원가입" />
      <Divider />
      <div className="flex flex-1 flex-col items-center justify-center gap-[30px]">
        <BelogLogo />
        <AuthIntro />
      </div>
      <GoogleAuthButton />
      <LoginPrompt />
    </main>
  );
}
