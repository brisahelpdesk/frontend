import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCreateTicketByEmployee } from "../hooks/use-create-ticket.hook";
import { useFetchClients } from "@/features/client/hooks/use-fetch-clients";
import { useFetchSLAs } from "@/features/slas/hooks/use-fetch-slas.hook";
import { Form } from "@/components/ui/form";
import { FormFieldSelect } from "@/components/form-field-select";
import { FormFieldInput } from "@/components/form-field-input"
import { FormFieldTextArea } from "@/components/form-field-text-area";
import { Plus, Send } from "lucide-react";

export function CreateTicketModal() {
  const {
    form,
    onSubmit,
    categories,
    productsFiltered,
    category,
    isLoading,
  } = useCreateTicketByEmployee()
  const { clients, isLoading: clientsLoading } = useFetchClients();
    const { slas, isLoading: slasLoading } = useFetchSLAs();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="shrink-0 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Criar Novo Ticket</DialogTitle>
          <DialogDescription>
            Preencha as informações do novo chamado
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormFieldSelect
                control={form.control}
                name="category"
                label="Categoria do produto *"
                selectItems={(categories || []).map((cat) => ({
                  value: cat.id.toString(),
                  label: cat.name,
                }))}
                placeholder="Selecione a categoria"
                required
                showError
              />

              <FormFieldSelect
                control={form.control}
                  name="productId"
                label="Equipamento/Sistema Específico *"
                selectItems={(productsFiltered || []).map((prod) => ({
                  value: prod.id.toString(),
                  label: prod.name,
                }))}
                placeholder={
                  category
                    ? "Selecione o equipamento"
                    : "Primeiro selecione a categoria"
                }
                disabled={!category || !productsFiltered?.length}
                required
                showError
              />
            </div>

              <FormFieldSelect
                control={form.control}
                name="requesterId"
              label="Cliente"
              selectItems={[
                ...((clients?.content || []) as any[]).map((c) => ({
                  value: String(c.userId ?? c.id ?? c.clientId ?? ""),
                  label: c.name || c.companyName || `#${c.userId ?? c.id ?? ""}`,
                })),
              ]}
              placeholder={clientsLoading ? "Carregando..." : "Selecione um cliente (opcional)"}
              showError={false}
            />

              <FormFieldSelect
                control={form.control}
                name="slaId"
                label="SLA *"
                selectItems={
                  (slas || []).map((s: any) => ({
                    value: String(s.id),
                    label: s.name || `SLA #${s.id}`,
                  }))
                }
                placeholder={slasLoading ? "Carregando SLAs..." : "Selecione um SLA"}
                required
                showError
              />

            <FormFieldInput
              name="title"
              label="Título Resumido do Problema *"
              placeholder="Ex: Impressora não conecta no Wi-Fi, Computador muito lento..."
              control={form.control}
              id="title"
              required
            />

            <FormFieldTextArea
              name="description"
              label="Descrição Detalhada do Problema *"
              placeholder={`Descreva o problema em detalhes:
  • O que exatamente acontece?
  • Quando começou?
  • Mensagens de erro (se houver)
  • O que você já tentou fazer?`}
              control={form.control}
              id="description"
              required
            />

            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-200">
              <Button
                type="submit"
                disabled={ isLoading || !form.formState.isValid }
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Criando Chamado...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Criar Chamado
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
