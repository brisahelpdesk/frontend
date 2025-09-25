import { AppPageHeader } from "@/components/app-page-header";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useLoaderData } from "react-router";

export function ClientDetailsPage() {
  const data = useLoaderData();

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <AppPageHeader
          name={`${data.name}`}
          description={`Criado em: ${data.createdDate} - Última atualização: ${data.updatedDate}`}
        />

        <div className="flex gap-2">
          <Button variant="outline">
            <Edit className="w-4 h-4" />
            Editar
          </Button>
          <Button variant="destructive">
            <Trash className="w-4 h-4" />
            Excluir
          </Button>
        </div>
      </div>
    </>
  );
}