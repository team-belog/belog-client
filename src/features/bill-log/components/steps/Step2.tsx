"use client";

import { useState, useEffect, useRef } from "react";

import InputField from "@/components/ui/InputField";
import SplitInputField from "@/features/bill-log/components/SplitInputField";
import Button from "@/components/ui/Button";
import BillTotal from "@/features/bill-log/components/BillTotal"
import { useBillFormStore } from "@/features/bill-log/store/useBillFormStore";

interface Step2Props {
  onNext: () => void;
}

export default function Step2({ onNext }: Step2Props) {
  const analyzedData = useBillFormStore((state) => state.analyzedData)
  const setStep2Data = useBillFormStore((state) => state.setStep2Data)

  const [title, setTitle] = useState("");
  const [items, setItems] = useState<{ item: string; price: string }[]>([{ item: "", price: "" }]);
  const [currency, setCurrency] = useState("KRW");
  const [currencySelected, setCurrencySelected] = useState(false);
  
  const isDisabled = !title.trim() || items.some((i) => !i.item.trim() || !i.price.trim());

  useEffect(() => {
    if (analyzedData) {
      setTitle(analyzedData.title);
      setItems(analyzedData.items.map((i) => ({
        item: i.name,
        price: String(i.amount),
      })));
    }
  }, [analyzedData]);

  const totalAmount = items.reduce((sum, i) => sum + (Number(i.price) || 0), 0);

  const addItem = () => {
    setItems((prev) => [...prev, { item: "", price: "" }]);
  };

  // 스와이프 삭제
  const startX = useRef(0);
  const isDragging = useRef(false);
  const [offsetXMap, setOffsetXMap] = useState<Record<number, number>>({});
  const THRESHOLD = 92;

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent, index: number) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    setOffsetXMap((prev) => ({ ...prev, [index]: Math.min(Math.max(delta, -THRESHOLD), 0) }));
  };

  const handlePointerUp = (index: number) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if ((offsetXMap[index] ?? 0) <= -THRESHOLD / 2) {
      setOffsetXMap((prev) => ({ ...prev, [index]: -THRESHOLD }));
    } else {
      setOffsetXMap((prev) => ({ ...prev, [index]: 0 }));
    }
  };

  const handleDelete = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setOffsetXMap((prev) => { const next = { ...prev }; delete next[index]; return next; });
  };

  return (
    <div className="flex flex-col pb-[230px]">
      <h1 className="pretendard-sb-20 mb-6 ml-4 mt-[10px]">얼마를 썼는지 입력해주세요.</h1>

      <InputField
        label="영수증 제목"
        placeholder="영수증 제목을 입력해주세요."
        value={title}
        onChange={setTitle}
      />

      <div className="mt-4 flex flex-col gap-[12px]">
        <p className="pretendard-sb-18 ml-4 text-main-black">항목</p>
        <div className="flex flex-col gap-2 overflow-y-auto max-[]:h-[224px]">
          {items.map((it, index) => (
            <SplitInputField
              key={index}
              offsetX={index > 0 ? (offsetXMap[index] ?? 0) : 0}
              onPointerDown={index > 0 ? handlePointerDown : undefined}
              onPointerMove={index > 0 ? (e) => handlePointerMove(e, index) : undefined}
              onPointerUp={index > 0 ? () => handlePointerUp(index) : undefined}
              onDelete={index > 0 ? () => handleDelete(index) : undefined}
              currency={currency}
              currencySelected={currencySelected}
              onCurrencyChange={(c) => { setCurrency(c); setCurrencySelected(true); }}
              left={{
                placeholder: "ex) 아메리카노",
                value: it.item ,
                onChange: (value) => setItems((prev) => prev.map((item,i) => i === index ? {...item, item: value} : item))
              }}
              right={{
                placeholder: "4,000",
                value: it.price,
                onChange: (value) => setItems((prev) => prev.map((item,i) => i === index ? {...item, price: value.replace(/\D/g, "")} : item))
              }}
            />
          ))}
        </div>
        <Button className="pt-0" variant="secondary" disabled={false} onClick={addItem}>
          항목 추가
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white">
        <BillTotal amount={`${totalAmount.toLocaleString()}원`} />
        <Button 
          variant="primary" 
          disabled={isDisabled} 
          onClick={() => {
              setStep2Data({
                title,
                items: items.map((i) => ({ name: i.item, amount: Number(i.price) })),
                totalAmount,
              });
              onNext();
          }}>
          다음
        </Button>
      </div>
    </div>
  );
}
