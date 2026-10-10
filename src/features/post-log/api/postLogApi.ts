import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { ApiResponse } from "@/lib/apiError";
import { PostLogTicketDetail } from "../types";

export async function getPostLogTicket(ticketId: number): Promise<PostLogTicketDetail> {
    const { data } = await api.get<ApiResponse<PostLogTicketDetail>>(
        ENDPOINTS.postLog.getTicket(ticketId)
    );
    return data.data;
}
