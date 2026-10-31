import { useSearchParams } from "next/navigation";
import ImageUploadField from "@/components/ui/ImageUploadField";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useGetReceiptImageUploadUrl } from "../../hooks/useGetReceiptImageUploadUrl";
import { useAnalyzeReceipt } from "../../hooks/useAnalyzeReceipt";
import { useBillFormStore } from "@/features/bill-log/store/useBillFormStore";
import { track } from "@/lib/amplitude";

interface Step1Props {
  onNext: () => void;
}

export default function Step1({ onNext }: Step1Props) {
  const searchParams = useSearchParams();
  const meetingId = Number(searchParams.get("meetingId"));
  const { mutate: getUploadUrl, isPending: isUploading } = useGetReceiptImageUploadUrl(meetingId);
  const { mutate: analyzeReceipt, isPending: isAnalyzing } = useAnalyzeReceipt(meetingId);
  const isLoading = isUploading || isAnalyzing;
  const setAnalyzedData = useBillFormStore((state) => state.setAnalyzedData);
  const setEntryMethod = useBillFormStore((state) => state.setEntryMethod);

  const handleUpload = (file: File) => {
    getUploadUrl(
      { contentType: file.type, fileSize: file.size },
      {
        onSuccess: async (uploadData) => {
          const res = await fetch(uploadData.uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });
          if (!res.ok) {
            track("Receipt Upload Completed", { meeting_id: String(meetingId), upload_status: "failed" });
            return;
          }
          track("Receipt Upload Completed", { meeting_id: String(meetingId), upload_status: "success" });
          analyzeReceipt(
            { receiptImageObjectKey: uploadData.objectKey },
            {
              onSuccess: (analyzedData) => {
                setAnalyzedData(analyzedData);
                setEntryMethod("receipt_ocr");
                onNext();
              },
            }
          );
        },
      }
    );
  };

  return (
    <div className="flex flex-col">
      {isLoading && <LoadingSpinner message="영수증을 분석하고 있어요..." />}
      <h1 className="pretendard-sb-20 mb-4 ml-4 mt-[10px]">얼마를 썼는지 입력해주세요.</h1>
      <ImageUploadField onUpload={handleUpload} />
      <Button variant="light" disabled={isLoading} onClick={() => { setEntryMethod("manual"); onNext(); }}>
        직접 입력
      </Button>
    </div>
  );
}
