import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatusKey = "completed" | "in_progress" | "pending";

type Collaborator = {
  name: string;
  subtitle: string;
  status: StatusKey;
};

const collaborators: Collaborator[] = [
  {
    name: "Alexandra Deff",
    subtitle: "Working on Github Project Repository",
    status: "completed",
  },
  {
    name: "Edwin Adenike",
    subtitle: "Working on Integrate User Authentication System",
    status: "in_progress",
  },
  {
    name: "Isaac Oluwatemilourun",
    subtitle: "Working on Develop Search and Filter Functionality",
    status: "pending",
  },
  {
    name: "David Oshodi",
    subtitle: "Working on Responsive Layout for Homepage",
    status: "in_progress",
  },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (a + b).toUpperCase();
}

const statusMeta: Record<StatusKey, { label: string; className: string }> = {
  completed: {
    label: "Completed",
    className: "border-success/25 bg-success/12 text-success",
  },
  in_progress: {
    label: "In Progress",
    className: "border-warning/25 bg-warning/12 text-warning",
  },
  pending: {
    label: "Pending",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

export function TeamCollaborationCard() {
  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Team Collaboration</CardTitle>
        <Button variant="outline" size="sm" className="h-9 rounded-xl">
          + Add Member
        </Button>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-3">
          {collaborators.map((c) => {
            const meta = statusMeta[c.status];
            return (
              <div
                key={c.name}
                className="flex items-center gap-3 rounded-2xl border bg-card px-3 py-2.5"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-xs font-semibold">
                    {initials(c.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold leading-none">
                    {c.name}
                  </div>
                  <div className="mt-1 truncate text-[11px] text-muted-foreground">
                    {c.subtitle}
                  </div>
                </div>

                <Badge
                  variant="outline"
                  className={
                    "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium " +
                    meta.className
                  }
                >
                  {meta.label}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
