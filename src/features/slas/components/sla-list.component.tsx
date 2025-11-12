import { memo, useMemo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, CheckCircle, XCircle, Eye } from "lucide-react";
import { useNavigate } from "react-router";
import { useFetchSLAs } from "../hooks/use-fetch-slas.hook";

export const SLAList = memo(function SLAList() {
  const { slas, isLoading, error } = useFetchSLAs();
  const navigate = useNavigate();

  const handleView = useCallback((slaId: number) => {
    navigate(`/app/slas/${slaId}`);
  }, [navigate]);

  const formattedSLAs = useMemo(() => {
    return slas.map((sla) => ({
      ...sla,
      statusBadge: sla.isActive ? (
        <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="w-3 h-3 mr-1" />
          Ativo
        </Badge>
      ) : (
        <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
          <XCircle className="w-3 h-3 mr-1" />
          Inativo
        </Badge>
      ),
    }));
  }, [slas]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-slate-600">Carregando SLAs...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-red-600">Erro ao carregar SLAs</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lista de SLAs</CardTitle>
      </CardHeader>
      <CardContent>
        {formattedSLAs.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Nenhum SLA cadastrado</p>
            <p className="text-sm text-slate-500">Crie seu primeiro SLA para começar</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-center">Tempo Resposta</TableHead>
                <TableHead className="text-center">Tempo Resolução</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedSLAs.map((sla) => (
                <TableRow key={sla.id} className="hover:bg-slate-50">
                  <TableCell 
                    className="font-medium cursor-pointer hover:text-blue-600"
                    onClick={() => handleView(sla.id)}
                  >
                    {sla.name}
                  </TableCell>
                  <TableCell className="max-w-xs truncate" title={sla.description}>
                    {sla.description}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-blue-700 border-blue-200">
                      {sla.responseTime / 60 }min
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-orange-700 border-orange-200">
                      {sla.resolutionTime / 60 }min
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{sla.statusBadge}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(sla.id)}
                        className="text-slate-600 hover:text-slate-700 hover:bg-slate-50"
                        title="Visualizar"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
});