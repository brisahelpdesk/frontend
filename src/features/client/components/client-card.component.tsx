import { InternalLink } from "@/components/internal-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, Mail, MapPin, Phone } from "lucide-react";

interface Props {
  userId: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: boolean;
  createdAt: string;
}

const getStatusBadge = (status: boolean) => {
  return (
    <Badge
      className={`font-medium ${
        status
          ? "bg-green-100 text-green-800 border-green-200"
          : "bg-red-100 text-red-800 border-red-200"
      } border`}
    >
      {status ? "Ativo" : "Inativo"}
    </Badge>
  );
};

export function ClientCard(props: Props) {
  const { userId, name, email, phone, address, status, createdAt } = props;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={"/placeholder.svg"} />
              <AvatarFallback className="bg-slate-200 text-slate-700 font-medium">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-slate-900">{name}</h3>
              <p className="text-sm text-slate-600">Cliente</p>
            </div>
          </div>
          <InternalLink href={`${userId}`}>
            <Button variant="ghost" size="icon">
              <Eye className="w-4 h-4 text-slate-500" />
            </Button>
          </InternalLink>
        </div>

        <div className="space-y-3 text-sm mb-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-4 h-4" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Phone className="w-4 h-4" />
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{address}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4" />
            <span>Cadastrado em: {formatDate(createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusBadge(status)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}