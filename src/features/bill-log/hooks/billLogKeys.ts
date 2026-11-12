export const billLogKeys = {
    all: ["billLog"] as const, 
    summary: (meetingId: number) => [...billLogKeys.all, "summary", meetingId] as const,
    bills: (meetingId: number) => [...billLogKeys.all, "bills", meetingId] as const,
    detail: (billId: number) => [...billLogKeys.all, "detail", billId] as const,
    settlement: (meetingId: number) => [...billLogKeys.all, "settlement", meetingId] as const
}