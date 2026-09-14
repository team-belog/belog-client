import BottomNav from "@/components/layout/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen pb-24">
      {children}
      <BottomNav />
    </div>
  );
}
