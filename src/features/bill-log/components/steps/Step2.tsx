"use client";

import { useState, useEffect } from "react";

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
              left={{ 
                placeholder: "ex) 아메리카노", 
                value: it.item ,
                onChange: (value) => setItems((prev) => prev.map((item,i) => i === index ? {...item, item: value} : item))
              }}
              right={{ 
                placeholder: "4,000원", 
                value: it.price,
                onChange: (value) => setItems((prev) => prev.map((item,i) => i === index ? {...item, price: value} : item))
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
