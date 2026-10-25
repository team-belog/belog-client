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

export type PhotoUploadRequest = {
    clientPhotoId: string;
    contentType: string;
    fileSize: number;
};

export type PhotoUploadItem = {
    clientPhotoId: string;
    objectKey: string;
    uploadUrl: string;
    method: string;
    requiredHeaders: Record<string, string>;
    expiresAt: string;
};

export type GetPhotoUploadUrlsResponse = {
    uploads: PhotoUploadItem[];
};

export type PhotoMetadataInput = {
    objectKey: string;
    capturedAt: string;
};

export type RegisteredPhoto = {
    photoId: number;
    objectKey: string;
    capturedAt: string;
};

export type RegisterPhotoMetadataResponse = {
    photos: RegisteredPhoto[];
};

export type LikePhotoResponse = {
    photoId: number;
    likedByMe: boolean;
    likeCount: number;
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

export type PostLogPhotoDay = {
    dayNumber: number;
    date: string;
    photos: PostLogPhoto[];
}

export type PostLogPhotoListResponse = {
    days: PostLogPhotoDay[];
    nextCursor: string | null;
    hasNext: boolean;
}