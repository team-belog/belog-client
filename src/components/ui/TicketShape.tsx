"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// 티켓 모양: 네 모서리는 오목한 홈, 한 축의 양쪽 변은 톱니(반원 홈)
// - horizontal: 왼쪽/오른쪽 변에 톱니 (가로로 긴 티켓)
// - vertical: 위/아래 변에 톱니 (세로로 긴 티켓)
type TicketOrientation = "horizontal" | "vertical";

interface TicketShapeProps {
  orientation?: TicketOrientation;
  className?: string;
  children: ReactNode;
}

const CORNER_RADIUS = 12;
const NOTCH_RADIUS = 5;
const NOTCH_SPACING = 20;
// 모서리에서 첫 톱니 중심까지의 거리
const NOTCH_INSET = 27;

// 변 길이에 맞춰 톱니 중심 좌표를 고르게 배치한다
function getNotchCenters(length: number): number[] {
  const available = length - NOTCH_INSET * 2;
  if (available <= 0) return [];
  const count = Math.round(available / NOTCH_SPACING) + 1;
  if (count === 1) return [length / 2];
  const gap = available / (count - 1);
  return Array.from({ length: count }, (_, i) => NOTCH_INSET + gap * i);
}

// 시계 방향으로 외곽선을 그린다. 모든 홈은 안쪽으로 파이는 호라서 sweep-flag가 0이다.
function buildTicketPath(width: number, height: number, orientation: TicketOrientation): string {
  const r = CORNER_RADIUS;
  const n = NOTCH_RADIUS;
  const arc = (radius: number, x: number, y: number) => `A ${radius} ${radius} 0 0 0 ${x} ${y}`;
  const parts: string[] = [`M ${r} 0`];

  if (orientation === "vertical") {
    for (const cx of getNotchCenters(width)) parts.push(`L ${cx - n} 0`, arc(n, cx + n, 0));
  }
  parts.push(`L ${width - r} 0`, arc(r, width, r));

  if (orientation === "horizontal") {
    for (const cy of getNotchCenters(height)) parts.push(`L ${width} ${cy - n}`, arc(n, width, cy + n));
  }
  parts.push(`L ${width} ${height - r}`, arc(r, width - r, height));

  if (orientation === "vertical") {
    for (const cx of getNotchCenters(width).reverse()) {
      parts.push(`L ${cx + n} ${height}`, arc(n, cx - n, height));
    }
  }
  parts.push(`L ${r} ${height}`, arc(r, 0, height - r));

  if (orientation === "horizontal") {
    for (const cy of getNotchCenters(height).reverse()) {
      parts.push(`L 0 ${cy + n}`, arc(n, 0, cy - n));
    }
  }
  parts.push(`L 0 ${r}`, arc(r, r, 0), "Z");

  return parts.join(" ");
}

export default function TicketShape({
  orientation = "horizontal",
  className = "",
  children,
}: TicketShapeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative drop-shadow-[0_0_1.5px_rgba(0,0,0,0.25)] ${className}`}
    >
      {size.width > 0 && size.height > 0 && (
        <svg
          aria-hidden
          className="absolute inset-0"
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
        >
          <path
            d={buildTicketPath(size.width, size.height, orientation)}
            className="fill-main-white"
          />
        </svg>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
