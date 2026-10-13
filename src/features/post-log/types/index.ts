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