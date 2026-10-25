import Image from "next/image";

import PwaAppLogo from "@/features/pwa/components/PwaAppLogo";

function StepTitle({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="flex size-5 items-center justify-center rounded-[5px] bg-main-black font-pretendard text-[13px] font-semibold text-main-mint">
        {step}
      </span>
      <p className="pretendard-sb-16 text-main-black">{title}</p>
    </div>
  );
}

function ClickLabel({ className }: { className: string }) {
  return (
    <span
      className={`pretendard-m-12 absolute -translate-x-1/2 tracking-[0.6px] text-main-mint ${className}`}
    >
      click!
    </span>
  );
}

function SectionDivider() {
  return <div className="h-px w-full bg-[#F1F4F9]" />;
}

export default function PwaInstallGuide() {
  return (
    <div className="px-4 pb-16 pt-[30px]">
      <p className="pretendard-sb-20 leading-[30px] text-main-black">
        홈 화면에 <span className="font-bold text-main-mint">BELOG</span>를
        추가해 볼까요?
      </p>

      <section className="mt-[29px]">
        <StepTitle step={1} title="브라우저 하단 공유 버튼 탭" />
        <div className="relative mt-[14px] h-[169px]">
          <div className="relative h-[61px] w-[243px] overflow-hidden rounded-[10px]">
            <Image
              src="/icons/pwa/browser-bar.png"
              alt="브라우저 하단 주소창"
              fill
              sizes="243px"
              className="object-cover"
              unoptimized
            />
          </div>
          <Image
            src="/icons/pwa/click-circle.svg"
            alt=""
            width={39}
            height={39}
            className="absolute left-[189.5px] top-[10.5px]"
          />
          <ClickLabel className="left-[244px] top-[6px]" />

          <div className="absolute right-2 top-[73px] h-[96px] w-[196px]">
            <div className="relative h-[76px] w-full overflow-hidden rounded-t-[28px]">
              <div className="absolute left-[-48.52%] top-[-45.7%] h-[406.45%] w-[162.09%]">
                <Image
                  src="/icons/pwa/share-menu.jpg"
                  alt="공유 메뉴"
                  fill
                  sizes="318px"
                />
              </div>
            </div>
            <div className="absolute left-[13px] top-2 h-[30px] w-[72px] rounded-[30px] border border-dashed border-main-mint" />
            <ClickLabel className="left-[105px] top-[5px]" />
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="mt-[28px]">
        <StepTitle step={2} title="홈 화면에 추가 선택" />
        <div className="relative mt-[25px] h-[96px]">
          <div className="absolute left-[13px] top-0 h-[96.19px] w-[206px] overflow-hidden rounded-[21.663px]">
            <div className="absolute left-[-0.41%] top-[-7.19%] h-[107.3%] w-[100.83%]">
              <Image
                src="/icons/pwa/add-to-home.png"
                alt="바탕화면에 추가 메뉴"
                fill
                sizes="208px"
                unoptimized
              />
            </div>
          </div>
          <div className="absolute left-[23.61px] top-[66.31px] h-[24.755px] w-[79.571px] rounded-[30px] border border-dashed border-main-mint" />
          <div className="absolute left-[26px] top-[13px]">
            <PwaAppLogo size={34} radius={7} />
          </div>
          <ClickLabel className="left-[122px] top-[62px]" />
        </div>
      </section>

      <div className="mt-[28px]">
        <SectionDivider />
      </div>

      <section className="mt-[19px]">
        <StepTitle step={3} title="추가된 앱 실행" />
        <div className="mx-auto mt-[30px] flex h-[103px] w-[99px] flex-col items-center gap-1 rounded-[11.976px] bg-[#575758] pt-[13.57px]">
          <PwaAppLogo size={63.871} />
          <p className="font-pretendard text-[9.581px] font-normal tracking-[0.479px] text-sub-white-2">
            BELOG
          </p>
        </div>
      </section>
    </div>
  );
}
