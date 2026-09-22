import Image from "next/image";

interface ProfileSectionProps {
  name: string;
  email: string;
  profileImageUrl?: string;
  onEdit?: () => void;
}

export default function ProfileSection({ name, email, profileImageUrl, onEdit }: ProfileSectionProps) {
  return (
    <div className="flex items-center gap-3 px-4 mt-[30px] mb-[50px]">
      <div className="relative size-[80px] shrink-0 overflow-hidden rounded-full">
        <Image
          src={profileImageUrl || "/icons/default-profile.svg"}
          alt="프로필 이미지"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-[6px]">
        <p className="pretendard-sb-18 text-main-black">{name}</p>
        <p className="pretendard-m-12 text-sub-gray-2">{email}</p>
      </div>
      <button onClick={onEdit} aria-label="프로필 편집">
        <Image src="/icons/my/edit.svg" alt="편집" width={40} height={40} />
      </button>
    </div>
  );
}
