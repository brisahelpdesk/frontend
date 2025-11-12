import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/features/auth/auth-store";
import { memo, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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

interface Props {
  comments: Comment[];
}

export const TicketCommentsHistory = memo(function TicketCommentsHistory(props: Props) {
  const { user } = useAuthStore();
  const lastCommentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedComments = useMemo(() => {
    return [...props.comments].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return dateA - dateB;
    });
  }, [props.comments]);


  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [sortedComments.length]);

  if (sortedComments.length === 0) {
    return (
      <div className="mb-3 text-center py-8">
        <p className="text-slate-500">Nenhum comentário encontrado.</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex flex-col space-y-4 mb-6 max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto pr-2 scroll-smooth comments-scrollbar"
    >
      {sortedComments.map((comment, index) => {
        const isCurrentUser = user?.id === comment.sender.id;
        const isSystemMessage = comment.type === "system";
        const isLastComment = index === sortedComments.length - 1;

        return (
          <div
            key={comment.id}
            ref={isLastComment ? lastCommentRef : null}
            className={cn(
              "w-full flex gap-3",
              isCurrentUser && !isSystemMessage && "flex"
            )}
          >
            <Avatar className={cn(
              "h-8 w-8 mt-1 flex-shrink-0",
              isCurrentUser && !isSystemMessage && "order-3"
            )}>
              <AvatarImage src="" />
              <AvatarFallback
                className={cn(
                  "text-xs font-semibold",
                  isSystemMessage
                    ? "bg-blue-200 text-blue-800"
                    : isCurrentUser
                    ? "bg-green-200 text-green-800"
                    : "bg-slate-200 text-slate-700"
                )}
              >
                {comment.sender.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className={cn(
              "flex-1 ",
              isCurrentUser && !isSystemMessage && "items-end"
            )}>
              <div
                className={cn(
                  "flex items-center gap-2 mb-1",
                  isCurrentUser && !isSystemMessage && "flex-row-reverse"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    isSystemMessage
                      ? "text-blue-700"
                      : isCurrentUser
                      ? "text-green-700"
                      : "text-slate-900"
                  )}
                >
                  {isCurrentUser && !isSystemMessage ? "Você" : comment.sender.username}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(comment.timestamp).toLocaleString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {isSystemMessage && (
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    Sistema
                  </Badge>
                )}
              </div>

              <div
                className={cn(
                  "max-w-4/6 text-sm p-3 rounded-lg break-words",
                  isSystemMessage
                    ? "bg-blue-50 text-blue-800 border border-blue-200"
                    : isCurrentUser
                    ? "ml-auto bg-green-50 text-green-900 border border-green-200 text-right"
                    : "bg-white text-slate-700 border border-slate-200 shadow-sm"
                )}
              >
                {comment.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});