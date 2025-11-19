import { memo, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateTicket } from "../hooks/use-update-ticket.hook";

type Props = {
  ticketId?: string | undefined;
  currentPriority?: string | undefined;
  disabled?: boolean;
};

const PRIORITIES: Array<{ label: string; value: string }> = [
  { label: "Crítica", value: "critica" },
  { label: "Alta", value: "alta" },
  { label: "Média", value: "media" },
  { label: "Baixa", value: "baixa" },
];

export const ChangePriorityModal = memo(function ChangePriorityModal({ ticketId, currentPriority, disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(currentPriority ? String(currentPriority) : undefined);

  const { mutate, isPending } = useUpdateTicket(ticketId);

  useEffect(() => {
    if (currentPriority) setSelected(String(currentPriority));
  }, [currentPriority]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!selected) return;
    mutate({ priority: selected }, { onSuccess: () => setIsOpen(false) });
  };

  if (disabled) {
    return (
      <Button variant="outline" className="border-slate-200 disabled:opacity-60 disabled:cursor-not-allowed" disabled>
        Alterar Prioridade
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-slate-200">
          Alterar Prioridade
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-lg">Alterar Prioridade</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="priority">Prioridade</Label>
            <Select value={selected} onValueChange={(v) => setSelected(v)}>
              <SelectTrigger className="bg-slate-50 border-slate-200">
                <SelectValue placeholder="Selecione uma prioridade" />
              </SelectTrigger>
              <SelectContent>
                {PRIORITIES.map((p) => (
                  <SelectItem value={p.value} key={p.value}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});
