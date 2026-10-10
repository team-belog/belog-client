export const ENDPOINTS = {
  auth: {
    googleLogin: "/auth/google",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
  billLog: {
  create: "/bill-log",
  getList: "/bill-log",
  getSummary: (meetingId: number) => `/meetings/${meetingId}/bill-log`,
  getSettlement: (meetingId: number) => `/meetings/${meetingId}/bill-log/settlement-requests`,
  getBills: (meetingId: number) => `/meetings/${meetingId}/bill-log/bills`,
  createBill: (meetingId: number) => `/meetings/${meetingId}/bill-log/bills`,
  getBillDetail: (billId: number) => `/bills/${billId}`,
  getUploadUrl: (meetingId: number) => `/meetings/${meetingId}/bill-log/receipt-images/upload-url`,
  analyzeReceipt: (meetingId: number) => `/meetings/${meetingId}/bill-log/receipt-analysis`,
}
} as const;
