"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const CORNER_RADIUS = 21.5;
const NOTCH_RADIUS = 9;
const NOTCH_COUNT = 7;

function buildPath(width: number, height: number): string {
  const cr = CORNER_RADIUS;
  const nr = NOTCH_RADIUS;

  const available = width - 2 * cr;
  const totalGap = available - NOTCH_COUNT * 2 * nr;
  const gap = totalGap / (NOTCH_COUNT + 1);
  const centers = Array.from({ length: NOTCH_COUNT }, (_, i) =>
    cr + gap + nr + i * (2 * nr + gap)
  );

  const arc = (r: number, x: number, y: number) =>
    `A ${r} ${r} 0 0 0 ${x} ${y}`;

  const parts: string[] = [`M ${cr} 0`];

  // 상단 노치
  for (const cx of centers) {
    parts.push(`L ${cx - nr} 0`, arc(nr, cx + nr, 0));
  }

  // 우상단 모서리
  parts.push(`L ${width - cr} 0`, arc(cr, width, cr));

  // 우측
  parts.push(`L ${width} ${height - cr}`);

  // 우하단 모서리
  parts.push(arc(cr, width - cr, height));

  // 하단 노치 (역순)
  for (const cx of [...centers].reverse()) {
    parts.push(`L ${cx + nr} ${height}`, arc(nr, cx - nr, height));
  }

  // 좌하단 모서리
  parts.push(`L ${cr} ${height}`, arc(cr, 0, height - cr));

  // 좌측
  parts.push(`L 0 ${cr}`);

  // 좌상단 모서리
  parts.push(arc(cr, cr, 0));

  parts.push("Z");
  return parts.join(" ");
}

export default function PostLogTicketShape({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
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
      className={`relative drop-shadow-[0_0_10px_rgba(0,0,0,0.15)] ${className}`}
    >
      {size.width > 0 && size.height > 0 && (
        <svg
          aria-hidden
          className="absolute inset-0"
          width={size.width}
          height={size.height}
          viewBox={`0 0 ${size.width} ${size.height}`}
        >
          <path d={buildPath(size.width, size.height)} fill="white" />
        </svg>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}
