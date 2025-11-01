import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useCloseTicket } from "../hooks/use-close-ticket.hook";
import { useAuthStore } from "@/features/auth/auth-store";

type Props = {
  ticketId?: string | undefined;
  disabled?: boolean;
};

export const CloseTicketModal = memo(function CloseTicketModal({ ticketId, disabled }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useCloseTicket(ticketId);
  const user = useAuthStore((s) => s.user);

  const handleConfirm = () => {
    const payload = {
      closedById: user?.id ?? 0,
      status: "resolved",
      closedAt: new Date().toISOString(),
    };

    mutate(payload, {
      onSuccess: () => setIsOpen(false),
    });
  };

  // If disabled (ticket closed), render a disabled button instead of the dialog trigger
  if (disabled) {
    return (
      <Button
        variant="outline"
        className="border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled
      >
        Fechar Ticket
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red-200 text-red-600 hover:bg-red-50"
        >
          Fechar Ticket
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-lg">Confirmar fechamento</DialogTitle>
        </DialogHeader>

        <div className="mt-4 text-sm">
          Tem certeza que deseja fechar este ticket? Esta ação pode ser revertida somente pelo administrador.
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button type="button" className="bg-red-600 hover:bg-red-700" onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Fechando..." : "Fechar Ticket"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});
