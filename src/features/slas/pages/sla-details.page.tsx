import { memo, useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Clock, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { AppPageHeader } from "@/components/app-page-header";
import { useFetchSLAs } from "../hooks/use-fetch-slas.hook";
import type { SLA } from "../models/sla.types";
import { useDeleteSLA } from "../hooks/use-delete-sla.hook";

export const SLADetailsPage = memo(function SLADetailsPage() {
  const { slaId } = useParams<{ slaId: string }>();
  const navigate = useNavigate();
  const { slas } = useFetchSLAs();
  const [sla, setSLA] = useState<SLA | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const handleNavigateBack = useCallback(() => {
    navigate("/app/slas");
  }, [navigate]);
  
  const { deleteSLA, isDeleting } = useDeleteSLA(handleNavigateBack);

  const handleDelete = useCallback((slaId: number) => {
      if (window.confirm("Tem certeza que deseja excluir este SLA?")) {
        deleteSLA(slaId);
      }
    }, [deleteSLA]);


  useEffect(() => {
    if (slaId && slas.length > 0) {
      const foundSLA = slas.find(s => s.id === Number(slaId));
      setSLA(foundSLA || null);
      setIsLoading(false);
    }
  }, [slaId, slas]);

  const handleBack = () => {
    navigate("/app/slas");
  };

  const handleEdit = () => {
    console.log("Edit SLA:", slaId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
        <div className="text-center py-8">
          <div className="text-slate-600">Carregando detalhes do SLA...</div>
        </div>
      </div>
    );
  }

  if (!sla) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>
        <div className="text-center py-8">
          <div className="text-red-600">SLA não encontrado</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <AppPageHeader 
            name={sla.name}
            description="Detalhes do acordo de nível de serviço"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleEdit} variant="outline">
            <Edit className="w-4 h-4 mr-1" />
            Editar
          </Button>
          <Button 
            onClick={() => handleDelete(sla.id)} 
            variant="destructive"
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            {isDeleting ? "Excluindo..." : "Excluir"}
          </Button>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Informações Gerais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Nome</h3>
              <p className="text-slate-700">{sla.name}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Descrição</h3>
              <p className="text-slate-700">{sla.description}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Status</h3>
              {sla.isActive ? (
                <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Ativo
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                  <XCircle className="w-3 h-3 mr-1" />
                  Inativo
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Tempos de Atendimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Tempo de Resposta</h3>
              <Badge variant="outline" className="text-blue-700 border-blue-200">
                {sla.responseTime} horas
              </Badge>
            </div>
            <Separator />
            <div>
              <h3 className="font-medium text-slate-900 mb-1">Tempo de Resolução</h3>
              <Badge variant="outline" className="text-orange-700 border-orange-200">
                {sla.resolutionTime} horas
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Criado em</h3>
                <p className="text-slate-700">
                  {new Date(sla.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Atualizado em</h3>
                <p className="text-slate-700">
                  {new Date(sla.updatedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});