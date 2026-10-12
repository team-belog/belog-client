import { create } from "zustand";
import type { BillSplitType, CreateBillItem, CreateBillShare, ReceiptAnalysisResponse } from "../types";

export type ShareDisplay = {
  participantMemberId: number;
  nickname: string;
  profileImageUrl: string | null;
  amount: number;
  payer: boolean;
};

type BillFormState = {
  title: string;
  items: CreateBillItem[];
  totalAmount: number;
  payerMemberId: number | null;
  payerNickname: string;
  splitType: BillSplitType | null;
  shares: CreateBillShare[];
  shareDisplays: ShareDisplay[];
  analyzedData: ReceiptAnalysisResponse | null;
};

type BillFormActions = {
  setAnalyzedData: (data: ReceiptAnalysisResponse) => void;
  setStep2Data: (data: { title: string; items: CreateBillItem[]; totalAmount: number }) => void;
  setStep3Data: (data: {
    payerMemberId: number;
    payerNickname: string;
    splitType: BillSplitType;
    shares: CreateBillShare[];
    shareDisplays: ShareDisplay[];
  }) => void;
  reset: () => void;
};

const initialState: BillFormState = {
  title: "",
  items: [],
  totalAmount: 0,
  payerMemberId: null,
  payerNickname: "",
  splitType: null,
  shares: [],
  shareDisplays: [],
  analyzedData: null,
};

export const useBillFormStore = create<BillFormState & BillFormActions>((set) => ({
  ...initialState,
  setAnalyzedData: (data) => set({ analyzedData: data }),
  setStep2Data: (data) => set(data),
  setStep3Data: (data) => set(data),
  reset: () => set(initialState),
}));
