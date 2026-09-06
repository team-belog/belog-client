"use client";

import { useState } from "react";

import InputField from "@/components/ui/InputField";
import SplitInputField from "@/features/bill-log/components/SplitInputField";
import Button from "@/components/ui/Button";
import BillTotal from "../BillTotal";

interface Step2Props {
  onNext: () => void;
}

interface ItemData {
  item: string;
  price: string;
}

export default function Step2({ onNext }: Step2Props) {
  const [title, setTitle] = useState("");
  const[item, setItem] = useState("")
  const[price, setPrice] = useState("")

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
          <SplitInputField
            left={{ placeholder: "ex) 아메리카노", value: item }}
            right={{ placeholder: "4,000원", value: price }}
          />
        </div>
        <Button variant="secondary" disabled={false}>
          항목 추가
        </Button>
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white">
        <BillTotal amount="0원" />
        <Button variant="primary" disabled={false} onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
}
