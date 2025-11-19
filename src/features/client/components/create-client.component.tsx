import { FormFieldInput } from "@/components/form-field-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useCreateClient } from "../hooks/use-create-client";
import { FormFieldPassword } from "@/components/input-password";

export function CreateClient() {
  const { form, onSubmit, openModal,isPending, setOpenModal } = useCreateClient();

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setOpenModal(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Cadastrar Cliente</DialogTitle>
          <DialogDescription>
            Preencha as informações básicas do cliente
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div>
              <FormFieldInput
                name="name"
                label="Nome"
                placeholder="Joao"
                control={form.control}
                id="name"
                disabled={isPending}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormFieldInput
                name="cpf"
                label="CPF"
                placeholder="10010010010"
                control={form.control}
                id="cpf"
                disabled={isPending}
                required
              />
            </div>

            <div className="mt-4">
              <FormFieldInput
                name="email"
                label="E-mail"
                placeholder="email@exemple.com"
                control={form.control}
                id="email"
                disabled={isPending}
                required
              />
            </div>

            <div className="mt-4">
              <FormFieldPassword
                label="Senha"
                placeholder="Digite sua senha"
                required
                id="password"
                name="password"
                control={form.control}
              />
            </div>

            <DialogFooter className="mt-4">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  type="reset"
                  onClick={() => setOpenModal(false)}
                  disabled={isPending}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={isPending}
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Cadastrar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
