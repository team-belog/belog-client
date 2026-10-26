import type { CropOutput } from "@/lib/cropImage";

// 그룹 홈 커버 배너(디자인 기준 393 × 203)와 같은 비율로 자름
export const GROUP_COVER_ASPECT = 393 / 203;

// 고해상도 화면에서도 선명하도록 디자인 크기의 3배로 저장
export const GROUP_COVER_OUTPUT: CropOutput = {
  width: 1179,
  height: 609,
  fileName: "group-cover.jpg",
};
