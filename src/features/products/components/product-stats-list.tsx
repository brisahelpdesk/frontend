import { Package, Settings } from "lucide-react";
import { ProductStat } from "./product-stat";

const stats = [
  {
    label: "Total",
    value: 120,
    icon: Package,
  },
  {
    label: "Produtos",
    value: 80,
    icon: Package,
  },
  {
    label: "Serviços",
    value: 40,
    icon: Settings,
  },
];

export function ProductStatsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <ProductStat
          key={index}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
