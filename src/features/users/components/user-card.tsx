import { InternalLink } from "@/components/internal-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Eye, Mail, Phone } from "lucide-react";

interface Props {
  name: string;
  email: string;
  phone: string;
  lastLogin: string;
  department: string;
  role: string;
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

const getRoleBadge = (role: string) => {
  const colors = {
    Administrador: "bg-purple-50 text-purple-700 border-purple-200",
    Gerente: "bg-blue-50 text-blue-700 border-blue-200",
    Técnico: "bg-green-50 text-green-700 border-green-200",
    Analista: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Usuário: "bg-slate-50 text-slate-700 border-slate-200",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${
        colors[role as keyof typeof colors]
      }`}
    >
      {role}
    </span>
  );
};

export function UserCard(props: Props) {
  const { name, email, phone, lastLogin, department, role, status } = props;
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
              <p className="text-sm text-slate-600">{department}</p>
            </div>
          </div>
          {/* <Button variant="ghost" size="icon">
            <Eye  className="w-4 h-4 text-slate-500" />
          </Button> */}
          <InternalLink href={`/users/${name.toLowerCase().replace(" ", "-")}`}>
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
            <Calendar className="w-4 h-4" />
            <span>Último acesso: {lastLogin}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getRoleBadge(role)}
            {getStatusBadge(status)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
