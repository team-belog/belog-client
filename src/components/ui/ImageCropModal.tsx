"use client";

import { useEffect, useState } from "react";
import Cropper, { type Area, type Point } from "react-easy-crop";

import { getCroppedImage } from "@/lib/cropImage";

interface ImageCropModalProps {
  imageSrc: string;
  onClose: () => void;
  onComplete: (file: File) => void;
}

export default function ImageCropModal({
  imageSrc,
  onClose,
  onComplete,
}: ImageCropModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleComplete = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const file = await getCroppedImage(imageSrc, croppedAreaPixels);
      onComplete(file);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-white">
      <div className="flex h-[56px] items-center justify-between px-4">
        <button
          type="button"
          onClick={onClose}
          className="pretendard-m-15 text-main-black"
        >
          취소
        </button>
        <p className="pretendard-sb-16 text-main-black">프로필 사진</p>
        <button
          type="button"
          onClick={handleComplete}
          disabled={!croppedAreaPixels || isProcessing}
          className="pretendard-m-15 text-main-mint disabled:opacity-50"
        >
          완료
        </button>
      </div>

      <div className="relative flex-1">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={true}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
        />
      </div>
    </div>
  );
}
