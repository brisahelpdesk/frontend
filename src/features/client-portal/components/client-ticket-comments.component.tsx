import { MessageSquare } from "lucide-react";
import { Client } from "@stomp/stompjs";
import { useEffect, useState, memo } from "react";
import type { Ticket } from "@/features/tickets/ticket.types";
import { useQueryClient } from "@tanstack/react-query";
import { TicketCommentsHistory } from "@/features/tickets/components/ticket-comments-history.component";
import { TicketCommentTextField } from "@/features/tickets/components/ticket-comment-text-field.component";

interface Props {
  ticketId: number;
  comments: Comment[];
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

export const ClientTicketComments = memo(function ClientTicketComments(props: Props) {
  const [client, setClient] = useState<Client | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const authStorage = localStorage.getItem("auth-storage");

    if (!authStorage) {
      console.error("Usuário não autenticado. Impossível conectar ao WebSocket.");
      return;
    }

    const token = JSON.parse(authStorage).state.token;

    if (!token) {
      console.error("Token de autenticação não encontrado. Impossível conectar ao WebSocket.");
      return;
    }

    const stompClient = new Client({
      webSocketFactory: () => new WebSocket("ws://localhost:8080/ws"),

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

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [props.ticketId, queryClient]);

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
        <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
        Comentários e Atualizações
      </h3>
      <TicketCommentsHistory comments={props.comments} />
      {client && (
        <TicketCommentTextField
          ticketId={props.ticketId}
          socketClient={client}
        />
      )}
    </div>
  );
});
