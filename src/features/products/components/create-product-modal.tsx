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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { SelectCategory } from "./select-product-category";
import { SelectProductType } from "./select-product-type";
import { useCreateProduct } from "../hook/use-create-product";
import { SelectItem } from "@/components/ui/select";

export function CreateProductModal() {
  const {
    isModalOpen,
    onOpenChange,
    openModal,
    closeModal,
    form,
    isPending,
    onSubmit,
  } = useCreateProduct();

  const loading = isPending || form.formState.isSubmitting;

  return (
    <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={openModal} className="bg-blue-600 hover:bg-blue-700">
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

        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <SelectProductType
                onValueChange={(value) => form.setValue("type", value)}
                defaultValue="default"
                value={form.watch("type")}
                required
              >
                <SelectItem value="default" disabled>
                  Selecione o tipo
                </SelectItem>
              </SelectProductType>

              {form.formState.errors.type && (
                <p className="text-red-600 text-sm">
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <SelectCategory
                onValueChange={(value) => form.setValue("categoryId", value)}
                defaultValue="default"
                value={form.watch("categoryId")}
                required
              >
                <SelectItem value="default" disabled>
                  Selecione a categoria
                </SelectItem>
              </SelectCategory>
              {form.formState.errors.categoryId && (
                <p className="text-red-600 text-sm">
                  {form.formState.errors.categoryId.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              placeholder="Digite o nome do produto ou serviço"
              required
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-red-600 text-sm">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o produto ou serviço"
              rows={3}
              className="h-20 resize-none"
              {...form.register("description")}
            />
          </div>

          <DialogFooter>
            <Button
              type="reset"
              variant="outline"
              onClick={closeModal}
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
      </DialogContent>
    </Dialog>
  );
}
