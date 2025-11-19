import { InternalLink } from "@/components/internal-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, Mail } from "lucide-react";

interface Props {
  id: number;
  name: string;
  email: string;
  lastLogin: string;
  status: string;
}

const getStatusBadge = (status: string) => {
  return (
    <Badge
      className={`font-medium ${
        status === "Ativo"
          ? "bg-green-100 text-green-800 border-green-200"
          : "bg-red-100 text-red-800 border-red-200"
      } border`}
    >
      {status}
    </Badge>
  );
};

export function EmployeeCard(props: Props) {
  const { id, name, email, lastLogin, status } = props;
  const splitedName = name.split(" ");

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={"/placeholder.svg"} />
              <AvatarFallback className="bg-slate-200 text-slate-700 font-medium">
                {splitedName[0][0] + splitedName[splitedName.length - 1][0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <InternalLink href={`${id}`}>
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
            <Calendar className="w-4 h-4" />
            <span>Último acesso: {lastLogin}</span>
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
