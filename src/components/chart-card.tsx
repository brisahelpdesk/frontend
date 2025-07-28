import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export interface ChartCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function ChartCard(props: ChartCardProps) {
  const { title, subtitle } = props;

  return (
    <Card className="lg:col-span-2 border border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-slate-900">
          {title}
        </CardTitle>
        <p className="text-slate-600">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
          <div className="text-center text-slate-500 w-full">
            {props.children || "Gráfico ou conteúdo aqui"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
