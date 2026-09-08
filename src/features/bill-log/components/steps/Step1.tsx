import ImageUploadField from "@/components/ui/ImageUploadField";
import Button from "@/components/ui/Button";

interface Step1Props {
  onNext: () => void;
}

export default function Step1({ onNext }: Step1Props) {
  return (
    <div className="flex flex-col">
      <h1 className="pretendard-sb-20 mb-4 ml-4 mt-[10px]">얼마를 썼는지 입력해주세요.</h1>
      <ImageUploadField />
      <Button variant="light" disabled={false} onClick={onNext}>
        직접 입력
      </Button>
    </div>
  );
}
