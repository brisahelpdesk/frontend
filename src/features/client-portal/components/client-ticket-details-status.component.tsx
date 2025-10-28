import { Badge } from "@/components/ui/badge";
import { memo } from "react";

interface ClientTicketDetailsStatusProps {
  status: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  Aberto: {
    label: "Aberto",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "Em Andamento": {
    label: "Em Andamento",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  "Aguardando Cliente": {
    label: "Aguardando Cliente",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  Resolvido: {
    label: "Resolvido",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  Fechado: {
    label: "Fechado",
    className: "bg-slate-100 text-slate-700 border-slate-300",
  },
};

export const ClientTicketDetailsStatus = memo(function ClientTicketDetailsStatus({
  status,
}: ClientTicketDetailsStatusProps) {
  const config = statusConfig[status] || statusConfig["Aberto"];

  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-600">Status:</span>
      <Badge
        variant="outline"
        className={`px-3 py-1 text-xs font-medium ${config.className}`}
      >
        {config.label}
      </Badge>
    </div>
  );
});
