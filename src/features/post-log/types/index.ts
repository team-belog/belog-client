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

export type PostLogParticipant = {
    groupMemberId: number;
    nickname: string;
    meetingCreator: boolean;
};

export type PostLogSettlement = {
    completedParticipantCount: number;
    totalAmount: number;
};

export type PostLogMeetingInfo = {
    ticketId: number | null;
    meetingId: number;
    meetingName: string;
    startDate: string;
    endDate: string;
    location: string;
    memory: string | null;
    settlement: PostLogSettlement;
    participantCount: number;
    participants: PostLogParticipant[];
    ticketCreated: boolean;
};

export type PostLogPhotoListRequest = {
    meetingId: number;
    cursor: string | undefined;
    size: number
}

export type PostLogPhoto = {
    photoId: number;
    photoUrl: string;
    capturedAt: string;
    likeCount: number;
    likedByMe: boolean;
}

export type PostLogPhotoListResponse = {
    items: PostLogPhoto[];
    nextCursor: string | null;
    hasNext: boolean;
}