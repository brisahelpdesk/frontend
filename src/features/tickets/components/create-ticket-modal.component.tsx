import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Package, Paperclip, Plus, Settings } from "lucide-react";
import { useState, useCallback, memo, type ChangeEvent } from "react";

export const CreateTicketModal = memo(function CreateTicketModal() {
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);

  const [formFields, setFormFields] = useState({
    titulo: "",
    tipoProduto: "",
    categoria: "",
    produto: "",
    prioridade: "",
    descricao: "",
  })

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormFields(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleCancel = useCallback(() => {
    setIsNewTicketOpen(false);
  }, []);

  const handleSubmit = useCallback(() => {
    setIsNewTicketOpen(false);
  }, []);

  const handleTipoProdutoChange = useCallback((value: string) => {
    setFormFields((fields) => ({
      ...fields,
      tipoProduto: value,
    }));
  }, []);

  const handleCategoriaChange = useCallback((value: string) => {
    setFormFields((fields) => ({
      ...fields,
      categoria: value,
    }));
  }, []);

  const handleProdutoChange = useCallback((value: string) => {
    setFormFields((fields) => ({
      ...fields,
      produto: value,
    }));
  }, []);

  const handlePrioridadeChange = useCallback((value: string) => {
    setFormFields((fields) => ({
      ...fields,
      prioridade: value,
    }));
  }, []);

  return (
    <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
      <DialogTrigger asChild>
        <Button className="shrink-0 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[calc(100vh-32px)] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Criar Novo Ticket</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo chamado
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-full h-full overflow-y-auto space-y-6 py-4">
          <div>
            <div className="space-y-2">
              <Label htmlFor="titulo">Título *</Label>
              <Input
                id="titulo"
                name="titulo"
                placeholder="Descreva brevemente o problema"
                className="bg-slate-50 border-slate-200 focus:border-blue-500"
                value={formFields.titulo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipoProduto">Tipo Produto *</Label>
              <Select
                defaultValue={formFields.tipoProduto}
                name="tipoProduto"
                onValueChange={handleTipoProdutoChange}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue
                    placeholder="Selecione o Tipo do produto"
                    id="tipoProduto"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Produto">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Produto
                    </div>
                  </SelectItem>
                  <SelectItem value="Serviço">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Serviço
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria Produto *</Label>
              <Select
                name="categoria"
                defaultValue={formFields.categoria}
                onValueChange={handleCategoriaChange}
                disabled={!formFields.tipoProduto}
              >
                <SelectTrigger
                  disabled={!formFields.tipoProduto}
                  className="bg-slate-50 border-slate-200"
                >
                  <SelectValue placeholder="Selecione a categoria do Produto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="software">Software</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="rede">Rede</SelectItem>
                  <SelectItem value="consultoria">Consultoria</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="produto">Produto *</Label>
              <Select
                name="produto"
                defaultValue={formFields.produto}
                onValueChange={handleProdutoChange}
                disabled={!formFields.tipoProduto || !formFields.categoria}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Microsoft Office 365">
                    Microsoft Office 365
                  </SelectItem>
                  <SelectItem value="Suporte Técnico Remoto">
                    Suporte Técnico Remoto
                  </SelectItem>
                  <SelectItem value="Notebook Dell Inspiron">
                    Notebook Dell Inspiron
                  </SelectItem>
                  <SelectItem value="Instalação de Software">
                    Instalação de Software
                  </SelectItem>
                  <SelectItem value="Antivírus Kaspersky">
                    Antivírus Kaspersky
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ticketTypes">Tipos de Chamado</Label>
              <Select>
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Selecione os tipos aplicáveis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">Falha de Sistema</SelectItem>
                  <SelectItem value="software">Erro de Software</SelectItem>
                  <SelectItem value="access">Solicitação de Acesso</SelectItem>
                  <SelectItem value="hardware">Hardware</SelectItem>
                  <SelectItem value="network">Rede/Conectividade</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade *</Label>
              <Select
                name="prioridade"
                defaultValue={formFields.prioridade}
                onValueChange={handlePrioridadeChange}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="critica">Crítica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição *</Label>
            <Textarea
              id="descricao"
              name="descricao"
              placeholder="Descreva detalhadamente o problema ou solicitação..."
              className="bg-slate-50 border-slate-200 focus:border-blue-500 min-h-[120px]"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachments">Anexos</Label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
              <Paperclip className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">
                Clique para adicionar arquivos ou arraste aqui
              </p>
              <p className="text-xs text-slate-500 mt-1">
                PNG, JPG, PDF até 10MB
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Criar Ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});
