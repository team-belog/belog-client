"use client";

import { useRef, useState, useEffect } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Script from "next/script";

import PreLogPlanList from "@/features/pre-log/components/PreLogPlanList";
import { useGetMapPlans } from "@/features/pre-log/hooks/useGetMapPlans";
import type { PreLogPlan } from "@/features/pre-log/types";

interface PreLogMapViewProps {
  meetingId: number;
  onSelectPlan?: (plan: PreLogPlan) => void;
  onDeletePlan?: (plan: PreLogPlan) => void;
  onTogglePlanPin?: (plan: PreLogPlan) => void;
  onLikePlan?: (plan: PreLogPlan) => void;
}

const SHEET_MIN_HEIGHT = 120;
const SHEET_DEFAULT_HEIGHT = 320;
const SHEET_TOP_INSET = 80;

export default function PreLogMapView({
  meetingId,
  onSelectPlan,
  onDeletePlan,
  onTogglePlanPin,
  onLikePlan,
}: PreLogMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<kakao.maps.Map | null>(null);
  const dragRef = useRef<{ startY: number; startHeight: number } | null>(null);
  const [sheetHeight, setSheetHeight] = useState(SHEET_DEFAULT_HEIGHT);
  const [mapReady, setMapReady] = useState(false);

  // 지도 마커는 좌표가 있는 지도 계획 목록으로, 하단 시트는 좋아요·고정·삭제가 가능한 계획 목록으로 표시
  const { data } = useGetMapPlans(meetingId);
  const mapPlans = data?.pages.flatMap((page) => page.items) ?? [];

  const initMap = () => {
    const container = mapRef.current;
    if (!container) return;
    const kakao = window.kakao;
    if (!kakao?.maps) return;
    kakao.maps.load(() => {
      mapInstanceRef.current = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 5,
      });
      setMapReady(true);
    });
  };

  useEffect(() => {
    const map = mapInstanceRef.current;
    const kakao = window.kakao;
    if (!mapReady || !map || !kakao || mapPlans.length === 0) return;
    const markerImage = new kakao.maps.MarkerImage(
      "/icons/pre-log/pinMarker.svg",
      new kakao.maps.Size(36, 36)
    );

    mapPlans.forEach((plan) => {
      new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(plan.latitude, plan.longitude),
        title: plan.title,
        image: markerImage,
      });
    });
    const first = mapPlans[0];
    map.setCenter(new kakao.maps.LatLng(first.latitude, first.longitude));
  }, [mapReady, mapPlans.length]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { startY: event.clientY, startHeight: sheetHeight };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || !containerRef.current) return;
    const maxHeight = containerRef.current.clientHeight - SHEET_TOP_INSET;
    const delta = dragRef.current.startY - event.clientY;
    const nextHeight = dragRef.current.startHeight + delta;
    setSheetHeight(Math.min(Math.max(nextHeight, SHEET_MIN_HEIGHT), maxHeight));
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  };

  useEffect(() => {
    if (window.kakao?.maps) {
      initMap();
    }
  },[])

  return (
    <div
      ref={containerRef}
      className="relative min-h-0 w-full flex-1 overflow-hidden"
    >
      <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`}
        strategy="afterInteractive"
        onLoad={initMap}
      />
      <div ref={mapRef} className="absolute inset-0" />

      <div
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col overflow-hidden rounded-t-[38px] bg-main-white shadow-[0_-4px_20px_0_rgba(0,0,0,0.05)]"
        style={{ height: sheetHeight }}
      >
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-label="목록 크기 조절"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="flex shrink-0 cursor-grab touch-none items-center justify-center py-[10px] active:cursor-grabbing"
        >
          <div className="h-[5px] w-[70px] rounded-[8px] bg-sub-gray-3" />
        </div>

        <PreLogPlanList
          meetingId={meetingId}
          filter="all"
          onSelectPlan={onSelectPlan}
          onDeletePlan={onDeletePlan}
          onTogglePlanPin={onTogglePlanPin}
          onLikePlan={onLikePlan}
          emptyMessage="아직 등록된 목록이 없어요"
          emptyClassName="py-[40px]"
          className="scrollbar-none flex flex-1 flex-col overflow-y-auto overscroll-contain"
        />
      </div>
    </div>
  );
}
