import { Api } from "@/lib/axios";
import type { Ticket } from "./ticket.types";
import type { Pagination } from "@/types/pagination";

export async function getTickets(page: number = 0, pageSize: number = 5): Promise<Pagination<Ticket>> {
  return await Api.fetch<null, Pagination<Ticket>>({
    endpoint: '/tickets',
    method: 'GET',
    data: null,
    params: {
      page,
      pageSize
    }
  });
}

export async function getTicketById(ticketId: string): Promise<Ticket> {
  return await Api.fetch<null, Ticket>({
    endpoint: `/tickets/${ticketId}`,
    method: 'GET',
    data: null
  });
}
