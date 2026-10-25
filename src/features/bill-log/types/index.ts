
export type SpentAmount = {
  currency: string
  amount: number
}

export type BillLogResponse = {
  totalSpentAmounts: SpentAmount[]
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

export type SettlementRequestStatus = "PENDING" | "COMPLETED"
export type SettlementRequestAction = "SEND_REMINDER" | "MARK_COMPLETE" | "NONE"

export type Settlement = {
  settlementRequestId: number
  amount: number
  sender: SettlementParticipant;
  receiver: SettlementParticipant;
  status: SettlementRequestStatus
  action: SettlementRequestAction
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

export type BillDetailResponse = {
  billId: number
  dayNumber: number
  paymentDate: string
  title: string
  payerNickname: string
  settlementMethod: BillSplitType
  items: BillItem[]
  totalAmount: number
  shares: BillShare[]
}

export type BillItem = {
  name: string
  amount: number
}

export type BillShare = {
  meetingParticipantId: number
  nickname: string
  profileImageUrl: string | null
  amount: number
  payer: boolean
}

export type BillSplitType = "EQUAL_SPLIT" | "ITEM_TAG" | "MANUAL"

export type CreateBillItem = {
  name: string
  amount: number
}

export type CreateBillShare = {
  participantMemberId: number
  amount: number
}

export type CreateBillRequest = {
  title: string
  payerMemberId: number
  totalAmount: number
  splitType: BillSplitType
  items: CreateBillItem[]
  shares: CreateBillShare[]
}

export type UploadUrlRequest = {
  contentType: string
  fileSize: number
}

export type UploadUrlResponse = {
  objectKey: string
  uploadUrl: string
  method: string
  requiredHeaders: {
    "Content-Type": string
    "Content-Length": string
  }
  expiresAt: string
}

export type ReceiptAnalysisRequest = {
  receiptImageObjectKey: string
}

export type ReceiptAnalysisItem = {
  name: string
  amount: number
}

export type ReceiptAnalysisResponse = {
  title: string
  paymentDate: string
  items: ReceiptAnalysisItem[]
  totalAmount: number
  requiresConfirmation: boolean
}