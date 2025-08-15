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
import { FormFieldSelect } from "@/components/form-field-select";
import { FormFieldSwitch } from "@/components/form-field-switch";
import { useCreateUser } from "../hooks/use-create-user";


export function CreateUser() {
  const { form, onSubmit, isPending, departments } = useCreateUser();

  const selectDepartmentItems =
    departments?.map((department) => ({
      value: department.id.toString(),
      label: department.name,
    })) || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
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
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <FormFieldInput
                name="firstName"
                label="Nome"
                placeholder="Joao"
                control={form.control}
                id="firstName"
                disabled={isPending}
                required
              />

              <FormFieldInput
                name="lastName"
                label="Sobrenome"
                placeholder="Silva"
                control={form.control}
                id="lastName"
                disabled={isPending}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <FormFieldInput
                name="document"
                label="Documento"
                placeholder="10010010010"
                control={form.control}
                id="document"
                disabled={isPending}
                required
              />

              <FormFieldSelect
                name="departmentId"
                label="Departamento"
                placeholder="Selecione um departamento"
                control={form.control}
                id="departmentId"
                selectItems={selectDepartmentItems}
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

            <div className="mt-4 grid grid-cols-2 gap-4">
              <FormFieldSwitch
                name="isActive"
                label="Ativo"
                control={form.control}
                id="isActive"
                disabled={isPending}
              />
            </div>

            <DialogFooter className="mt-4">
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="reset">Cancelar</Button>
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
