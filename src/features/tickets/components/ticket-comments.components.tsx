import { MessageSquare } from "lucide-react";
import { TicketCommentTextField } from "./ticket-comment-text-field.component";
import { TicketCommentsHistory } from "./ticket-comments-history.component";
import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import type { Ticket } from "../ticket.types";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/auth-store";

interface Props {
  ticketId: number;
  comments: Comment[];
  responsibleEmployeeId?: number;
}

interface Comment {
  id: number;
  content: string;
  timestamp: Date;
  type: string;
  sender: {
    id: number;
    username: string;
    roles: string[];
  };
}

const URL_SOCKET = import.meta.env.VITE_SOCKET_URL;

export function TicketComments(props: Props) {
  const [client, setClient] = useState<Client | null>(null);
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  // Verificar se o usuário logado é o técnico responsável pelo ticket
  const isResponsibleEmployee = user?.id === props.responsibleEmployeeId;

  useEffect(() => {
    const authStorage = localStorage.getItem("auth-storage");

    if (!authStorage) {
      console.error("Usuário não autenticado. Impossível conectar ao WebSocket.");
      return;
    }

    const token = JSON.parse(authStorage).state.token;

    if (!token) {
      console.log("authStorage:", authStorage);
      console.error("Token de autenticação não encontrado. Impossível conectar ao WebSocket.");
      return;
    }

    const stompClient = new Client({
      webSocketFactory: () => new WebSocket(URL_SOCKET),

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,

      debug: (str) => {
        console.log("STOMP Debug:", str); 
      },
    });

    stompClient.onConnect = () => {
      console.log("WebSocket conectado com sucesso!");

      stompClient.subscribe(`/topic/chat/${props.ticketId}`, (message) => {
        console.log("Mensagem recebida:", message.body);
        if (message.body) {
          const newComment = JSON.parse(message.body);

          queryClient.setQueryData(
            ["tickets", String(props.ticketId)],
            (oldData: Ticket | undefined) => {

              console.log("Old Data:", oldData);

              if (!oldData) return oldData;

              return {
                ...oldData,
                chat: {
                  ...oldData.chat,
                  messages: [
                    ...oldData.chat.messages,
                    {
                      id: newComment.id,
                      content: newComment.content,
                      timestamp: newComment.timestamp,
                      type: newComment.type,
                      sender: newComment.sender,
                    }
                  ]
                }
              }
            }
          );
        }
      });
    };

    stompClient.onStompError = (frame) => {
      console.error("Erro STOMP:", frame);
    };

    stompClient.onWebSocketError = (event) => {
      console.error("Erro WebSocket:", event);
    };

    stompClient.activate();
    setClient(stompClient);

    if (stompClient.connected) {
      console.log("WebSocket já está conectado.");
    }

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [props.ticketId]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <MessageSquare className="w-5 h-3 mr-2 text-blue-600" />
        Histórico e Comentários
      </h3>
      <TicketCommentsHistory comments={props.comments} />
      {client && isResponsibleEmployee && (
        <TicketCommentTextField
          ticketId={props.ticketId}
          socketClient={client}
        />
      )}
      {!isResponsibleEmployee && (
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          <p className="font-medium">Apenas o técnico responsável pode enviar mensagens neste ticket.</p>
        </div>
      )}
    </div>
  );
}
