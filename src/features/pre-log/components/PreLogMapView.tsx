"use client";

import { useRef, useState, useEffect } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Script from "next/script";

import PreLogEmptyState from "@/features/pre-log/components/PreLogEmptyState";
import PreLogPlaceItem from "@/features/pre-log/components/PreLogPlaceItem";
import { useGetMapPlans } from "@/features/pre-log/hooks/useGetMapPlans";
import type { PreLogPlace } from "@/features/pre-log/types";

interface PreLogMapViewProps {
  meetingId: number;
  onSelectPlace?: (place: PreLogPlace) => void;
  onDeletePlace?: (place: PreLogPlace) => void;
}

const SHEET_MIN_HEIGHT = 120;
const SHEET_DEFAULT_HEIGHT = 320;
const SHEET_TOP_INSET = 80;

export default function PreLogMapView({
  meetingId,
  onSelectPlace,
  onDeletePlace,
}: PreLogMapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const dragRef = useRef<{ startY: number; startHeight: number } | null>(null);
  const [sheetHeight, setSheetHeight] = useState(SHEET_DEFAULT_HEIGHT);
  const [mapReady, setMapReady] = useState(false);

  const { data } = useGetMapPlans(meetingId);
  const mapPlans = data?.pages.flatMap((page) => page.items) ?? [];

  const initMap = () => {
    if (!mapRef.current) return;
    const kakao = (window as any).kakao;
    if (!kakao?.maps) return;
    kakao.maps.load(() => {
      mapInstanceRef.current = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(37.5665, 126.9780),
        level: 5,
      });
      setMapReady(true);
    });
  };

  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current || mapPlans.length === 0) return;
    const kakao = (window as any).kakao;
    const markerImage = new kakao.maps.MarkerImage(
      "/icons/pre-log/pinMarker.svg",
      new kakao.maps.Size(36, 36)
    );

    mapPlans.forEach((plan) => {
      new kakao.maps.Marker({
        map: mapInstanceRef.current,
        position: new kakao.maps.LatLng(plan.latitude, plan.longitude),
        title: plan.title,
        image: markerImage,
      });
    });
    const first = mapPlans[0];
    mapInstanceRef.current.setCenter(new kakao.maps.LatLng(first.latitude, first.longitude));
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

        {mapPlans.length > 0 ? (
          <div className="scrollbar-none flex flex-1 flex-col overflow-y-auto overscroll-contain">
            {mapPlans.map((plan) => (
              <PreLogPlaceItem
                key={plan.planId}
                place={{
                  id: plan.planId,
                  category: plan.category.toLowerCase() as PreLogPlace["category"],
                  title: plan.title,
                  address: plan.address,
                  likeCount: 0,
                  isPinned: plan.pinned,
                }}
                onClick={onSelectPlace}
                onDelete={onDeletePlace}
              />
            ))}
          </div>
        ) : (
          <PreLogEmptyState message="아직 등록된 목록이 없어요" className="py-[40px]" />
        )}
      </div>
    </div>
  );
}
