export type PaymentItem = {
  id: number;
  thumbnailUrl: string;
  name: string;
  amount: string;
  payer: string;
};

export type DailyPayment = {
  date: string;
  totalAmount: string;
  items: PaymentItem[];
};

export type MenuItem = {
  title: string;
  amount: string;
};

export type Member = {
  name: string;
};

export type BillContent = {
  date: string;
  totalAmount: string;
  members: Member[];
  menu: MenuItem[];
};

export type BillLogResponse = {
  totalSpentAmount: number
  completedParticipantCount: number
  pendingParticipantCount: number
}

export type SettlementRequests = {
  meetingId: number
  cursor: string | undefined
  size: number
}

export type SettlementResponse = {
  items: Settlement[]
  nextCursor: string | null
  hasNext: boolean
}

export type Settlement = {
  settlementRequestId: number
  amount: number
  sender: SettlementParticipant;
  receiver: SettlementParticipant;
  status: "PENDING" | "COMPLETED"
  action: "SEND_REMINDER" | "none"
}

export type SettlementParticipant = {
  meetingParticipantId: number
  nickname: string
  profileImageUrl: string | null
  isMe: boolean
}

export type BillsRequest = {
  meetingId:  number
  cursorDate: string | undefined
  size: number
}

export type BillsResponse = {
  days: Bills[]
  nextCursorDate : string
  hasNext: boolean
}

export type Bills = {
dayNumber: number
paymentDate: string
dailyTotalAmount: number
bills: Bill[]
}

export type Bill = {
  billId: number
  title: string
  payerNickname: string
  totalAmount: number
}