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
  
export async function assignTicket(ticketId: string, employeeId: number): Promise<Ticket> {
  return await Api.fetch<{ employeeId: number }, Ticket>({
    endpoint: `/tickets/${ticketId}/assign`,
    method: 'POST',
    data: { employeeId }
  });
}

export type CloseTicketPayload = {
  closedById: number;
  status: string;
  closedAt: string;
};

export async function closeTicket(ticketId: string, data: CloseTicketPayload): Promise<Ticket> {
  return await Api.fetch<CloseTicketPayload, Ticket>({
    endpoint: `/tickets/${ticketId}/close`,
    method: 'POST',
    data,
  });
}
