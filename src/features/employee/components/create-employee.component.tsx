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
import { useCreateEmployee } from "../hooks/use-create-employee";

export function CreateEmployee() {
  const { 
    form, 
    onSubmit, 
    isPending, 
    departments, 
    openModal, 
    setOpenModal 
  } = useCreateEmployee();

  const selectDepartmentItems =
    departments?.map((dept) => ({
      value: dept.id.toString(),
      label: dept.name,
    })) || [];

  return (
    <Dialog open={openModal}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpenModal(true)}>
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
                name="cpf"
                label="CPF"
                placeholder="10010010010"
                control={form.control}
                id="cpf"
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
                <Button variant="outline" type="reset" onClick={() => setOpenModal(false)} disabled={isPending}>
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
