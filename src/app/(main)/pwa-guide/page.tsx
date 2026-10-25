import BackHeader from "@/components/layout/BackHeader";
import Divider from "@/components/layout/Divider";
import PwaInstallGuide from "@/features/pwa/components/PwaInstallGuide";

export default function PwaGuidePage() {
  return (
    <main className="flex flex-col pt-[60px]">
      <BackHeader title="추가 방법" />
      <Divider />
      <PwaInstallGuide />
    </main>
  );
}
