import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Client } from "@stomp/stompjs";
import { Send } from "lucide-react";
import { useState } from "react";


interface Props {
  ticketId: number;
  socketClient: Client;
}


export function TicketCommentTextField(props: Props) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (comment.trim() && props.socketClient.connected) {
      console.log('Enviando mensagem:', comment);
        props.socketClient.publish({
        destination: `/app/chat/${props.ticketId}`,
        body: comment.trim(),
      });

      setComment("");
    } else if (!props.socketClient.connected) {
      console.error('WebSocket não está conectado');
    }
  };

  return (
    <form 
      className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200"
      onSubmit={handleCommentSubmit} 
    >
      <Label className="text-sm font-medium text-slate-700">
        Adicionar comentário
      </Label>
      <Textarea
        id="comment"
        placeholder="Digite seu comentário..."
        className="resize-none h-24 bg-white border-slate-200 focus:border-blue-500"
        rows={3}
        value={comment}
        onChange={handleCommentChange}
      />
      <div className="flex justify-between items-center">
        <Button 
          type="submit"
          size="sm" 
          className="ml-auto bg-blue-600 hover:bg-blue-700"
          disabled={!comment.trim() || !props.socketClient?.connected}
        >
          <Send className="w-4 h-4 mr-2" />
          Comentar
        </Button>
      </div>
    </form>
  );
}
