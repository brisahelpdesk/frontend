import { memo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpdateTicket } from "../hooks/use-update-ticket.hook";

type Props = {
  ticketId?: string | undefined;
  currentStatus?: string | undefined;
  disabled?: boolean;
};

const STATUSES = [
  "ABERTO",
  "EM ANDAMENTO",
  "AGUARDANDO TERCEIRA",
  "CANCELADO",
];

export const ChangeStatusModal = memo(function ChangeStatusModal({ ticketId, currentStatus, disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(currentStatus ? String(currentStatus) : undefined);

  const { mutate, isPending } = useUpdateTicket(ticketId);

  useEffect(() => {
    if (currentStatus) setSelected(String(currentStatus));
  }, [currentStatus]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!selected) return;
    mutate({ status: selected }, {
      onSuccess: () => setIsOpen(false),
    });
  };

  if (disabled) {
    return (
      <Button variant="outline" className="border-slate-200 disabled:opacity-60 disabled:cursor-not-allowed" disabled>
        Alterar Status
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-slate-200">
          Alterar Status
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-lg">Alterar Status</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={selected} onValueChange={(v) => setSelected(v)}>
              <SelectTrigger className="bg-slate-50 border-slate-200">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem value={s} key={s}>{s}</SelectItem>
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
