import { MetricCard } from "./metric-card";

const metrics = [
  {
    title: "Tickets Resolvidos",
    value: "148",
    subtitle: "neste mês",
    color: "from-blue-500 to-blue-600",
    icon: "🎫",
  },
  {
    title: "Tickets Pendentes",
    value: "23",
    subtitle: "neste mês",
    color: "from-red-500 to-red-600",
    icon: "🎫",
  },
  {
    title: "Tempo Médio",
    value: "4.2h",
    subtitle: "Resolução",
    color: "from-green-500 to-green-600",
    icon: "⏱️",
  },
  {
    title: "Satisfação",
    value: "94%",
    subtitle: "Avaliação média",
    color: "from-purple-500 to-purple-600",
    icon: "⭐",
  },
];

export function MetricCardList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {
        metrics.map((metric, index) => (
          <MetricCard
            key={index}
            color={metric.color}
            icon={metric.icon}
            value={metric.value}
            title={metric.title}
            subtitle={metric.subtitle}
          />
        ))
      }
    </div>
  );
}
