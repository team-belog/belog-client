import type { Area } from "react-easy-crop";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("이미지를 불러오지 못했습니다."));
    image.src = src;
  });
}

export async function getCroppedImage(
  src: string,
  area: Area,
  outputSize = 512,
): Promise<File> {
  const image = await loadImage(src);

  const canvas = document.createElement("canvas");
  canvas.width = outputSize;
  canvas.height = outputSize;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas를 사용할 수 없습니다.");

  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, outputSize, outputSize);

  ctx.drawImage(
    image,
    area.x,
    area.y,
    area.width,
    area.height,
    0,
    0,
    outputSize,
    outputSize,
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.9),
  );
  if (!blob) throw new Error("이미지 변환에 실패했습니다.");

  return new File([blob], "profile.jpg", { type: "image/jpeg" });
}
