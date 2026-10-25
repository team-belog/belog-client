"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  visible: boolean;
  onHide: () => void;
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#49D4B6" />
      <path
        d="M5.5 10.5L8.5 13.5L14.5 7.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#FF6B6B" />
      <path
        d="M7 7L13 13M13 7L7 13"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Toast({
  message,
  type = "success",
  visible,
  onHide,
}: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onHide, 300);
      }, 2700);
      return () => clearTimeout(timer);
    }
  }, [visible, onHide]);

  if (!visible && !show) return null;

  return (
    <div
      className={`fixed bottom-[100px] left-1/2 z-50 flex -translate-x-1/2 items-center gap-[8px] rounded-full bg-[#2B2B2B]/70 px-[16px] py-[10px] shadow-lg transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-2"
      }`}
    >
      {type === "success" ? <CheckIcon /> : <ErrorIcon />}
      <span className="pretendard-m-14 whitespace-nowrap text-main-white">
        {message}
      </span>
    </div>
  );
}
