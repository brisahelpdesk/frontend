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
import { useForm } from "react-hook-form";

interface CreateUserFields {
  internalId: string;
  document: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  hiredAt: string;
  dismissedAt: string | null;
}

export function CreateUser() {
  const form = useForm<CreateUserFields>({
    defaultValues: {
      internalId: "",
      document: "",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Cadastrar Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha as informações básicas do usuário
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <FormFieldInput
                control={form.control}
                name=""
                label="ID Interno"
                placeholder="ID do usuário"
                id="internalId"
              />
              <FormFieldInput
                name="document"
                label="Documento"
                placeholder="CPF ou CNPJ"
                control={form.control}
                id="document"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormFieldInput
                name="firstName"
                label="Nome"
                placeholder="Nome do usuário"
                control={form.control}
                id="firstName"
              />

              <FormFieldInput
                name="lastName"
                label="Sobrenome"
                placeholder="Sobrenome do usuário"
                control={form.control}
                id="lastName"
              />
            </div>

            <div className="mt-4">
              <FormFieldInput
                name="email"
                label="E-mail"
                placeholder="E-mail do usuário"
                control={form.control}
                id="email"
              />
            </div>

            <DialogFooter className="mt-4">
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancelar</Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
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
