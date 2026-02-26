import { Briefcase, Plus, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ProjectItem = {
  name: string;
  subtitle: string;
  due: string;
  icon: React.ComponentType<{ className?: string }>;
};

const projects: ProjectItem[] = [
  {
    name: "Fintech Mobile App",
    subtitle: "UI polishing",
    due: "Due in 2 days",
    icon: Sparkles,
  },
  {
    name: "Brand Guidelines",
    subtitle: "Assets & typography",
    due: "Due in 5 days",
    icon: ShieldCheck,
  },
  {
    name: "Landing Page",
    subtitle: "Hero + pricing",
    due: "Due in 1 week",
    icon: Briefcase,
  },
];

export function ProjectListCard() {
  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Project</CardTitle>
        <Button variant="outline" size="sm" className="h-9 rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          New
        </Button>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          {projects.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 rounded-2xl border bg-card p-3"
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted/60">
                <p.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold">{p.name}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {p.subtitle}
                </div>
              </div>
              <div className="text-right text-[11px] text-muted-foreground">
                {p.due}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
