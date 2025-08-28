import { Card, CardContent } from "@/components/ui/card";
import type { ElementType } from "react";

export interface ProductStatProps {
  label: string;
  value: number;
  icon: ElementType;
}

export function ProductStat(props: ProductStatProps) {
  const { label, value, icon } = props;

  const Icon = icon;

  return (
    <Card className="shadow-none">
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
