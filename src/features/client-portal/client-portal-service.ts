import { Api } from "@/lib/axios";
import type { Ticket } from "../tickets/ticket-types";

export async function getClientTickets(): Promise<Ticket[]> {
  return await Api.fetch<null, Ticket[]>({
    endpoint: '/tickets',
    method: 'GET',
    data: null
  });
}


interface CreateClientTicketData {
  title: string;
  description: string;
  productId: number;
}

export async function createClientTicket(data: CreateClientTicketData) {
  return await Api.fetch<CreateClientTicketData, Ticket>({
    endpoint: '/tickets/open',
    method: 'POST',
    data
  });
}


export async function getClientTicketById(ticketId: string): Promise<Ticket> {
  return await Api.fetch<null, Ticket>({
    endpoint: `/tickets/${ticketId}`,
    method: 'GET',
    data: null
  });
}