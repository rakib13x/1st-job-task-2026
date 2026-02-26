import { ArrowUpRight, Plus } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { ProjectAnalyticsCard } from "@/components/dashboard/ProjectAnalyticsCard";
import { ProjectListCard } from "@/components/dashboard/ProjectListCard";
import { ProjectProgressCard } from "@/components/dashboard/ProjectProgressCard";
import { RemindersCard } from "@/components/dashboard/RemindersCard";
import { TeamCollaborationCard } from "@/components/dashboard/TeamCollaborationCard";
import { TimeTrackerCard } from "@/components/dashboard/TimeTrackerCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-[1200px]">
        <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Plan, prioritize, and accomplish your tasks with ease.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button className="h-11 rounded-2xl px-5">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
            <Button variant="outline" className="h-11 rounded-2xl px-5">
              Import Data
            </Button>
          </div>
        </header>

        {/* KPI strip */}
        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {[
            ["Total Projects", 24],
            ["Ended Projects", 10],
            ["Running Projects", 12],
            ["Pending Project", 2],
          ].map(([label, value], idx) => (
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
                <div className="text-4xl font-semibold">{value}</div>
                <div
                  className={
                    idx === 0
                      ? "mt-2 text-xs text-primary-foreground/80"
                      : "mt-2 text-xs text-muted-foreground transition-colors group-hover:text-primary-foreground/80"
                  }
                >
                  Increased from last month
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Bento grid (2 rows, equal height per row on desktop) */}
        <section className="mt-4 space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <ProjectAnalyticsCard />
            </div>
            <div className="lg:col-span-4">
              <RemindersCard />
            </div>
            <div className="lg:col-span-4">
              <ProjectListCard />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <TeamCollaborationCard />
            </div>

            <div className="lg:col-span-4">
              <ProjectProgressCard />
            </div>

            <div className="lg:col-span-4">
              <TimeTrackerCard />
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
};

export default Index;
