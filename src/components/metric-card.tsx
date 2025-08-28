import { Card, CardContent } from "./ui/card";

export interface MetricCardProps {
  color: string;
  icon: string;
  value: string | number;
  title: string;
  subtitle: string;
}

export function MetricCard(props: MetricCardProps) {
  const { color, icon, value, title, subtitle } = props;

  return (
    <Card className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}
          >
            <span className="text-xl">{icon}</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">
              {value}
            </div>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>
        <h3 className="font-semibold text-slate-700">{title}</h3>
      </CardContent>
    </Card>
  );
}
