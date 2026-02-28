import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardUsers, type DashboardUser } from "@/hooks/use-dashboard";

type StatusKey = DashboardUser["status"];

const statusMeta: Record<StatusKey, { label: string; className: string }> = {
  active: {
    label: "Active",
    className: "border-success/25 bg-success/12 text-success",
  },
  inactive: {
    label: "Inactive",
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
  return (a + b).toUpperCase();
}

export function UsersListCard() {
  const { data: users = [], isLoading, isError } = useDashboardUsers();

  const visibleUsers = users.slice(0, 4);

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2 pt-3 px-4">
        <CardTitle className="text-sm">User List</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-xl text-xs px-3"
        >
          + Add User
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden px-4 pb-3">
        {isError && (
          <div className="text-red-600 text-xs">
            Failed to load team members.
          </div>
        )}
        <div className="flex flex-col gap-2 h-full">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 animate-pulse rounded-xl bg-muted"
                />
              ))
            : visibleUsers.map((u) => {
                const meta = statusMeta[u.status] || {
                  label: u.status,
                  className: "",
                };
                return (
                  <div
                    key={u.id}
                    className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2 flex-1"
                  >
                    <Avatar className="h-7 w-7 shrink-0">
                      <AvatarFallback className="text-[10px] font-semibold">
                        {initials(u.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-xs font-semibold leading-none">
                        {u.name}
                      </div>
                      <div className="mt-0.5 truncate text-[10px] text-muted-foreground">
                        {u.email}
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
