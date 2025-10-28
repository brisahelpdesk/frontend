import { useFetchClients } from "../hooks/use-fetch-clients";
import { ClientCard } from "./client-card.component";

export function ClientList() {
  const { clients, isLoading } = useFetchClients();

  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-48 bg-slate-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!clients || clients.content.length === 0) {
    return (
      <div className="mt-8 text-center py-12">
        <p className="text-slate-500">Nenhum cliente encontrado.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {clients?.content.map((client) => (
        <ClientCard 
          key={client.userId + "client-card-list"} 
          userId={client.userId}
          name={client.name}
          email={client.email}
          phone={client.phone}
          address={client.address}
          status={client.status}
          createdAt={client.createdAt}
        />
      ))}
    </div>
  );
}