import { AppPageHeader } from "@/components/app-page-header";
import { MetricCardList } from "@/components/metric-card-list";
import { DashboardChartLine } from "./components/dashboard-chart-line";
import { DashboardChartPie } from "./components/dashboard-chart-pie";
import { DashboardChartBar } from "./components/dashboard-chart-bar";

export function DashboardPage() {
  return (
    <>
      <AppPageHeader
        name="Dashboard"
        description="Bem-vindo ao sistema de gerenciamento de chamados"
      />

      <MetricCardList />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <DashboardChartLine />
        <DashboardChartPie />
      </div>

      <DashboardChartBar />
    </>
  );
}
