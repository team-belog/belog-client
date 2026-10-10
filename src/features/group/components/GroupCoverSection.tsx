import Image from "next/image";

import ImageUploadIcon from "@/components/ui/ImageUploadIcon";

interface GroupCoverSectionProps {
  name: string;
  coverImageUrl?: string;
  canEditCoverImage: boolean;
  onChangeCoverImage?: () => void;
}

export default function GroupCoverSection({
  name,
  coverImageUrl,
  canEditCoverImage,
  onChangeCoverImage,
}: GroupCoverSectionProps) {
  return (
    <div className="relative h-[203px] w-full overflow-hidden bg-main-cool-gray">
      {coverImageUrl && <Image src={coverImageUrl} alt="" fill className="object-cover" />}
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute left-4 top-[17px] flex w-[144px] flex-col gap-2">
        <p className="pretendard-sb-20 text-main-white">{name}</p>
        <p className="pretendard-m-12 text-main-white">그룹의 약속을 확인해 보세요</p>
      </div>

      {canEditCoverImage && (
        <button
          type="button"
          onClick={onChangeCoverImage}
          className="absolute bottom-[14px] right-4 flex items-center gap-[5px]"
        >
          <span className="pretendard-m-12 text-sub-gray-3">이미지 변경</span>
          <ImageUploadIcon width={25} height={25} className="text-sub-gray-3" />
        </button>
      )}
    </div>
  );
}
