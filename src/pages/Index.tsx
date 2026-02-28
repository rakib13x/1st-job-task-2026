import { ArrowUpRight, Plus } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProductAnalyticsCard } from "@/components/dashboard/ProductAnalyticsCard";
import { ProductListCard } from "@/components/dashboard/ProductListCard";
import { UserProgressCard } from "@/components/dashboard/UserProgressCard";
import { RemindersCard } from "@/components/dashboard/RemindersCard";
import { UsersListCard } from "@/components/dashboard/UsersListCard";
import { TimeTrackerCard } from "@/components/dashboard/TimeTrackerCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardOverview } from "@/hooks/use-dashboard";
const Index = () => {
  const {
    data: DashboardOverview,
    isLoading,
    isError,
  } = useDashboardOverview();
  const safeOverview = DashboardOverview ?? {
    totalUsers: 0,
    activeUsers: 0,
    revenue: 0,
    growth: 0,
  };
  const overviewItems = [
    { label: "Total Users", value: safeOverview.totalUsers },
    { label: "Active Users", value: safeOverview.activeUsers },
    {
      label: "Revenue",
      value: safeOverview.revenue,
      formatter: (v: number) => `$${v.toLocaleString()}`,
    },
    {
      label: "Growth",
      value: safeOverview.growth,
      formatter: (v: number) => `${v}%`,
    },
  ];
  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <header className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Plan, prioritize, and accomplish your tasks with ease.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button className="h-12 rounded-full px-4 text-sm ">
              <Plus className="h-3 w-3" /> Add Project
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-full px-4 text-sm border-2 border-green-700"
            >
              Import Data
            </Button>
          </div>
        </header>
        {isError && (
          <div className="mb-2 text-red-600 text-sm">
            Failed to load overview data.
          </div>
        )}
        {/* KPI strip */}
        <section className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
          {overviewItems.map(({ label, value, formatter }, idx) => (
            <Card
              key={label}
              className={
                idx === 0
                  ? "group border-0 bg-primary text-primary-foreground shadow-sm [background-image:linear-gradient(120deg,hsl(var(--primary))_0%,hsl(var(--primary)/0.92)_45%,hsl(var(--primary)/0.85)_100%),radial-gradient(900px_420px_at_85%_20%,hsl(var(--primary-foreground)/0.10),transparent_62%),radial-gradient(700px_420px_at_15%_90%,hsl(var(--foreground)/0.12),transparent_58%)]"
                  : "group bg-card shadow-sm transition-colors hover:border-0 hover:bg-primary hover:text-primary-foreground hover:[background-image:linear-gradient(120deg,hsl(var(--primary))_0%,hsl(var(--primary)/0.92)_45%,hsl(var(--primary)/0.85)_100%),radial-gradient(900px_420px_at_85%_20%,hsl(var(--primary-foreground)/0.10),transparent_62%),radial-gradient(700px_420px_at_15%_90%,hsl(var(--foreground)/0.12),transparent_58%)]"
              }
            >
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <span
                  className={
                    idx === 0
                      ? "grid h-9 w-9 place-items-center rounded-xl bg-primary-foreground/10"
                      : "grid h-9 w-9 place-items-center rounded-xl border transition-colors group-hover:border-primary-foreground/15 group-hover:bg-primary-foreground/10"
                  }
                >
                  <ArrowUpRight
                    className={
                      idx === 0
                        ? "h-4 w-4"
                        : "h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary-foreground"
                    }
                  />
                </span>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-semibold">
                  {isLoading ? "..." : formatter ? formatter(value) : value}
                </div>
                <div
                  className={
                    idx === 0
                      ? "mt-2 text-xs text-primary-foreground/80"
                      : "mt-2 text-xs text-muted-foreground transition-colors group-hover:text-primary-foreground/80"
                  }
                >
                  {isLoading ? "Loading" : "Increased from last month"}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
        {/* Bento grid — desktop */}
        <section className="mt-3">
          <div
            className="hidden lg:grid grid-cols-8 grid-rows-4 gap-3"
            style={{
              gridTemplateRows: "repeat(4, minmax(0, 1fr))",
              height: "calc(100vh - 340px)",
            }}
          >
            <div className="col-span-4 row-span-2">
              <ProductAnalyticsCard />
            </div>
            <div className="col-span-2 row-span-2 col-start-5">
              <RemindersCard />
            </div>
            <div className="col-span-2 row-span-3 col-start-7">
              <ProductListCard />
            </div>
            <div className="col-span-3 row-span-2 row-start-3">
              <UsersListCard />
            </div>
            <div className="col-span-3 row-span-2 col-start-4 row-start-3">
              <UserProgressCard />
            </div>
            <div className="col-span-2 col-start-7 row-start-4">
              <TimeTrackerCard />
            </div>
          </div>
          {/* Mobile layout */}
          <div className="flex flex-col gap-3 lg:hidden">
            <div className="h-[280px]">
              <ProductAnalyticsCard />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-[220px]">
                <RemindersCard />
              </div>
              <div className="h-[220px]">
                <TimeTrackerCard />
              </div>
            </div>
            <div className="h-[320px]">
              <ProductListCard />
            </div>
            <div className="h-[280px]">
              <UsersListCard />
            </div>
            <div className="h-[280px]">
              <UserProgressCard />
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
};
export default Index;
