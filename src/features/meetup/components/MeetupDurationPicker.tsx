"use client";

import { useRef, useState } from "react";

const MAX_NIGHTS = 30;
const ROW_HEIGHT = 44;
const CLICK_THRESHOLD_PX = 4;
const UNDECIDED = "미정";

interface MeetupDurationPickerProps {
  label: string;
  required?: boolean;
  /** 박 수. null = 미정, 0 = 무박 */
  nights: number | null;
  onChange: (nights: number | null) => void;
}

interface PickerColumnProps {
  suffix: string;
  options: string[];
  index: number;
  onSelect: (index: number) => void;
}

function PickerColumn({ suffix, options, index, onSelect }: PickerColumnProps) {
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const moved = useRef(false);

  const clamp = (i: number) => Math.min(Math.max(i, 0), options.length - 1);

  // 드래그 중에는 손가락/마우스를 그대로 따라가고, 놓으면 가장 가까운 값으로 부드럽게 스냅
  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    startY.current = e.clientY;
    moved.current = false;
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const diff = e.clientY - startY.current;
    if (Math.abs(diff) > CLICK_THRESHOLD_PX) moved.current = true;
    // 양 끝에서는 저항을 줘서 더 못 넘어가게 한다
    const min = -(options.length - 1 - index) * ROW_HEIGHT;
    const max = index * ROW_HEIGHT;
    setOffset(Math.min(Math.max(diff, min), max));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    if (moved.current) {
      onSelect(clamp(index - Math.round(offset / ROW_HEIGHT)));
    } else {
      // 탭: 누른 위치의 행(-1/0/+1)으로 이동
      const y = e.clientY - e.currentTarget.getBoundingClientRect().top;
      step(Math.floor(y / ROW_HEIGHT) - 1);
    }
    setOffset(0);
  };

  const step = (delta: number) => onSelect(clamp(index + delta));

  return (
    <div className="flex items-center gap-4">
      <div
        role="spinbutton"
        tabIndex={0}
        aria-valuetext={options[index]}
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") step(-1);
          if (e.key === "ArrowDown") step(1);
        }}
        onWheel={(e) => step(e.deltaY > 0 ? 1 : -1)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ height: ROW_HEIGHT * 3 }}
        className="group relative w-[140px] cursor-grab touch-none select-none overflow-hidden outline-none active:cursor-grabbing"
      >
        <div
          className="absolute inset-x-0 rounded-[12px] bg-main-cool-gray group-focus-visible:ring-1 group-focus-visible:ring-main-mint"
          style={{ top: ROW_HEIGHT + (ROW_HEIGHT - 56) / 2, height: 56 }}
        />
        <div
          className={dragging ? "" : "transition-transform duration-200 ease-out"}
          style={{
            transform: `translateY(${ROW_HEIGHT - index * ROW_HEIGHT + offset}px)`,
          }}
        >
          {options.map((option, i) => {
            const selected = i === clamp(index - Math.round(offset / ROW_HEIGHT));
            return (
              <div
                key={option + i}
                style={{ height: ROW_HEIGHT }}
                className={`relative flex items-center justify-center transition-colors ${
                  selected
                    ? "pretendard-m-15 text-main-black"
                    : "pretendard-m-14 text-sub-gray-2"
                }`}
              >
                {option}
              </div>
            );
          })}
        </div>
      </div>
      <span className="pretendard-sb-16 text-main-black">{suffix}</span>
    </div>
  );
}

export default function MeetupDurationPicker({
  label,
  required = false,
  nights,
  onChange,
}: MeetupDurationPickerProps) {
  const nightOptions = [
    UNDECIDED,
    "무박",
    ...Array.from({ length: MAX_NIGHTS }, (_, i) => String(i + 1)),
  ];
  const dayOptions = [
    UNDECIDED,
    ...Array.from({ length: MAX_NIGHTS + 1 }, (_, i) => String(i + 1)),
  ];

  // 두 열은 같은 인덱스로 연동된다 (n박 ↔ n+1일)
  const index = nights === null ? 0 : nights + 1;
  const select = (i: number) => onChange(i === 0 ? null : i - 1);

  return (
    <div className="flex flex-col gap-[10px]">
      <p className="pretendard-sb-16 flex items-center gap-[2px] text-main-black">
        {label}
        {required && <span className="text-[#FF3B3B]">*</span>}
      </p>
      <div className="flex justify-between">
        <PickerColumn
          suffix="박"
          options={nightOptions}
          index={index}
          onSelect={select}
        />
        <PickerColumn
          suffix="일"
          options={dayOptions}
          index={index}
          onSelect={select}
        />
      </div>
    </div>
  );
}
