import { create } from "zustand";
import type { BillSplitType, CreateBillItem, CreateBillShare, ReceiptAnalysisResponse } from "../types";

type BillFormState = {
  title: string;
  items: CreateBillItem[];
  totalAmount: number;
  payerMemberId: number | null;
  splitType: BillSplitType | null;
  shares: CreateBillShare[];
  analyzedData: ReceiptAnalysisResponse | null
};

type BillFormActions = {
  setAnalyzedData: (data: ReceiptAnalysisResponse) => void
  setStep2Data: (data: { title: string; items: CreateBillItem[]; totalAmount: number }) => void;
  setStep3Data: (data: { payerMemberId: number; splitType: BillSplitType; shares: CreateBillShare[] }) => void;
  reset: () => void;
};

const initialState: BillFormState = {
  title: "",
  items: [],
  totalAmount: 0,
  payerMemberId: null,
  splitType: null,
  shares: [],
  analyzedData: null
};

export const useBillFormStore = create<BillFormState & BillFormActions>((set) => ({
  ...initialState,
  setAnalyzedData: (data) => set(data),
  setStep2Data: (data) => set(data),
  setStep3Data: (data) => set(data),
  reset: () => set(initialState),
}));
