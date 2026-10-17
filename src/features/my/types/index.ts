export type PostLogTicket = {
    ticketId: number;
    meetingEndDate: string;
    thumbnailUrl: string | null;
};

export type PostLogCalendarResponse = {
    yearMonth: string;
    today: string;
    hasUnreadNotification: boolean;
    memoryCount: number;
    tickets: PostLogTicket[];
};
