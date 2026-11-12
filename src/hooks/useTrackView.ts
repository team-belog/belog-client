import { useEffect, useRef } from "react";
import { track } from "@/lib/amplitude";

// 화면 데이터가 준비된 뒤 조회 이벤트를 한 번만 전송. properties가 null이면 아직 준비 전
export function useTrackView(
  event: string,
  properties: Record<string, unknown> | null,
) {
  const trackedKey = useRef<string | null>(null);

  useEffect(() => {
    if (!properties) return;

    const key = `${event}:${JSON.stringify(properties)}`;
    if (trackedKey.current === key) return;

    trackedKey.current = key;
    track(event, properties);
  });
}
