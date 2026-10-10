export type TicketMember = {
    groupMemberId: number;
    nickname: string;
};

export type PostLogTicketDetail = {
    ticketId: number;
    meetingName: string;
    memory: string;
    coverPhotoUrl: string | null;
    startDate: string;
    endDate: string;
    location: string;
    members: TicketMember[];
};
