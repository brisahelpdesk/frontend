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
import { Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/form-field-input";
import { FormFieldSelect } from "@/components/form-field-select";
import { FormFieldSwitch } from "@/components/form-field-switch";
import { FormFieldTextArea } from "@/components/form-field-text-area";
import { useProductsViewModel } from "../hook/use-products-view-model";

export function CreateProductModal() {
  const {
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    createForm,
    isCreatingProduct,
    onSubmitCreateProduct,
    selectCategoryItems,
    selectTypeItems,
  } = useProductsViewModel();

  const loading = isCreatingProduct || createForm.formState.isSubmitting;

  return (
    <Dialog open={isCreateModalOpen} onOpenChange={openCreateModal}>
      <DialogTrigger asChild>
        <Button onClick={openCreateModal} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto/Serviço
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Produto/Serviço</DialogTitle>
          <DialogDescription>
            Adicione um novo produto ou serviço ao catálogo
          </DialogDescription>
        </DialogHeader>

        <Form {...createForm}>
          <form className="space-y-4" onSubmit={onSubmitCreateProduct}>
            <FormFieldInput
              control={createForm.control}
              id="name"
              name="name"
              label="Nome"
              placeholder="Digite o nome do produto ou serviço"
              required
            />

            <FormFieldInput
              control={createForm.control}
              id="internalId"
              name="internalId"
              label="ID Interno"
              placeholder="Digite o ID interno do produto ou serviço"
            />

            <div className="grid grid-cols-2 gap-4">
              <FormFieldSelect
                control={createForm.control}
                name="type"
                selectItems={selectTypeItems}
                label="Tipo"
                placeholder="Selecione o tipo"
                required
                showError
              />

              <FormFieldSelect
                control={createForm.control}
                selectItems={selectCategoryItems}
                name="categoryId"
                label="Categoria"
                placeholder="Selecione uma categoria"
                required
                showError
              />
            </div>

            <FormFieldTextArea
              control={createForm.control}
              id="description"
              name="description"
              label="Descrição"
              className="resize-none"
              placeholder="Digite uma descrição para o produto ou serviço"
              description="Uma breve descrição do produto ou serviço"
              showError
            />

            <div className="grid grid-cols-2 space-x-4">
              <FormFieldSwitch
                control={createForm.control}
                id="isActive"
                name="isActive"
                label="Ativo"
                required
              />

              <FormFieldSwitch
                control={createForm.control}
                id="isPhysical"
                name="isPhysical"
                label="Físico"
                required
              />
            </div>


            <DialogFooter>
              <Button
                type="reset"
                variant="outline"
                onClick={closeCreateModal}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Criando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">Criar</div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
