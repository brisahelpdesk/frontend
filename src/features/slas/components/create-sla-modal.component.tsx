import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { useCreateSLA } from "../hooks/use-create-sla.hook";

export const CreateSLAModal = memo(function CreateSLAModal() {
  const { form, onSubmit, isSubmitting, isModalOpen, openModal, closeModal } = useCreateSLA();

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => open ? openModal() : closeModal()}>
      <DialogTrigger asChild>
        <Button className="shrink-0 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo SLA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Criar Novo SLA</DialogTitle>
          <DialogDescription>
            Defina os níveis de serviço e tempos de resposta
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome *</Label>
            <Input
              id="name"
              placeholder="Ex: SLA Crítico"
              className="bg-slate-50 border-slate-200 focus:border-blue-500"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              placeholder="Descreva as condições e aplicabilidade do SLA"
              className="bg-slate-50 border-slate-200 focus:border-blue-500 min-h-[80px]"
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responseTime">Tempo Resposta (min) *</Label>
              <Input
                id="responseTime"
                type="number"
                min="1"
                placeholder="1"
                className="bg-slate-50 border-slate-200 focus:border-blue-500"
                {...form.register("responseTime", { valueAsNumber: true })}
              />
              {form.formState.errors.responseTime && (
                <p className="text-sm text-red-600">{form.formState.errors.responseTime.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolutionTime">Tempo Resolução (min) *</Label>
              <Input
                id="resolutionTime"
                type="number"
                min="1"
                placeholder="24"
                className="bg-slate-50 border-slate-200 focus:border-blue-500"
                {...form.register("resolutionTime", { valueAsNumber: true })}
              />
              {form.formState.errors.resolutionTime && (
                <p className="text-sm text-red-600">{form.formState.errors.resolutionTime.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              {...form.register("isActive")}
            />
            <Label htmlFor="isActive">SLA Ativo</Label>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Criando..." : "Criar SLA"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});