import type { Settlement, DailyPayment } from "@/features/bill-log/types";

export const DUMMY_SETTLEMENTS: Settlement[] = [
  { id: 1, fromName: "바비", toName: "정바미", amount: "7,500원", status: "request" },
  { id: 2, fromName: "김민준", toName: "정바미", amount: "12,000원", status: "pending" },
  { id: 3, fromName: "이수아", toName: "정바미", amount: "5,000원", status: "completed" },
];

export const DUMMY_DAILY_PAYMENTS: DailyPayment[] = [
  {
    date: "Day 01 (2026.08.06)",
    totalAmount: "22,000원",
    items: [
      { id: 1, thumbnailUrl: "/images/cafe.jpg", name: "아랑이 카페", amount: "11,000원", payer: "정바미" },
      { id: 2, thumbnailUrl: "/images/restaurant.jpg", name: "맛집", amount: "11,000원", payer: "바비" },
    ],
  },
  {
    date: "Day 01 (2026.08.07)",
    totalAmount: "15,000원",
    items: [
      { id: 3, thumbnailUrl: "/images/cafe.jpg", name: "스타벅스", amount: "15,000원", payer: "김민준" },
    ],
  },
];
