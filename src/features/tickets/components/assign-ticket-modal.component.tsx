import { memo, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFetchEmployees } from "@/features/employee/hooks/use-fetch-employees";
import { useAssignTicket } from "../hooks/use-assign-ticket.hook";
import { toast } from "sonner";

type Props = {
  ticketId?: string | undefined;
  currentResponsibleId?: number | undefined;
  disabled?: boolean;
};

export const AssignTicketModal = memo(function AssignTicketModal({ ticketId, currentResponsibleId, disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | undefined>(currentResponsibleId ? String(currentResponsibleId) : undefined);

  const { users, isLoading } = useFetchEmployees();
  const { mutate, isPending } = useAssignTicket(ticketId);

  useEffect(() => {
    if (currentResponsibleId) setSelected(String(currentResponsibleId));
  }, [currentResponsibleId]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!selected) {
      toast.error("Selecione um técnico");
      return;
    }

    mutate(Number(selected), {
      onSuccess: () => setIsOpen(false),
    });
  };

  if (disabled) {
    return (
      <Button variant="outline" className="border-slate-200 disabled:opacity-60 disabled:cursor-not-allowed" disabled>
        Atribuir Técnico
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-slate-200">
          Atribuir Técnico
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Atribuir Técnico</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="technician">Técnico</Label>
            <Select value={selected} onValueChange={(v) => setSelected(v)}>
              <SelectTrigger className="bg-slate-50 border-slate-200">
                <SelectValue placeholder={isLoading ? "Carregando..." : "Selecione um técnico"} />
              </SelectTrigger>
              <SelectContent>
                {users && users.length > 0 ? (
                  users.map((u: any) => (
                    <SelectItem value={String(u.id)} key={u.id}>{u.name || u.username || `#${u.id}`}</SelectItem>
                  ))
                ) : (
                  <SelectItem value="">Nenhum técnico encontrado</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isPending}>
              {isPending ? "Atribuindo..." : "Atribuir"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
});
