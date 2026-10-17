import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import AuthIntro from "@/features/auth/components/shared/AuthIntro";
import BelogLogo from "@/features/auth/components/shared/BelogLogo";
import GoogleAuthButton from "@/features/auth/components/shared/GoogleAuthButton";
import RegisterPrompt from "@/features/auth/components/login/RegisterPrompt";

export default function LoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center pb-[35px]">
      <BackHeader title="로그인" />
      <Divider />
      <div className="flex flex-1 flex-col items-center justify-center gap-[30px]">
        <BelogLogo />
        <AuthIntro />
      </div>
      <GoogleAuthButton />
      <RegisterPrompt />
    </main>
  );
}
