import { Send, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { FormFieldSelect } from "@/components/form-field-select";
import { FormFieldInput } from "@/components/form-field-input";
import { FormFieldTextArea } from "@/components/form-field-text-area";
import { useCreateTicketByClient } from "../hooks/use-create-ticket-by-client";

export function ClientPortalNewTicket() {
  const { 
    form, 
    categories, 
    productsFiltered, 
    category, 
    onSubmit,
    isLoading,
  } = useCreateTicketByClient();

  console.log(form.formState.errors);

  return (
    <TabsContent value="new-ticket" className="min-h-screen bg-slate-50">
      <div className="max-w-7xl w-full">
        <Card className="w-full border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              Vamos identificar seu problema
            </CardTitle>
            <p className="text-slate-600">
              Primeiro, nos conte qual tipo de problema você está enfrentando
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-6">
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
                    name="product"
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
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
