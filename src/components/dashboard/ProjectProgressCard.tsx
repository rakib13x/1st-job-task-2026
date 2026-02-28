import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardOverview } from "@/hooks/use-dashboard";

export function ProjectProgressCard() {
  const { data: overview, isLoading } = useDashboardOverview();

  const totalUsers = overview?.totalUsers ?? 0;
  const activeUsers = overview?.activeUsers ?? 0;
  const inactiveUsers = totalUsers - activeUsers;

  const activePercent = totalUsers
    ? Math.round((activeUsers / totalUsers) * 100)
    : 0;
  const inactivePercent = totalUsers
    ? Math.round((inactiveUsers / totalUsers) * 100)
    : 0;

  const cx = 120;
  const cy = 120;
  const r = 80;
  const strokeW = 30;
  const strokeR = strokeW / 2;

  const polar = (angleDeg: number) => {
    const a = (Math.PI / 180) * angleDeg;
    return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
  };

  const arc = (startDeg: number, endDeg: number) => {
    const s = polar(startDeg);
    const e = polar(endDeg);
    const largeArcFlag = Math.abs(endDeg - startDeg) <= 180 ? "0" : "1";
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${e.x} ${e.y}`;
  };

  // a0=180 (far left) → activeUsers → inactiveUsers → a3=0 (far right)
  const a0 = 180;
  const a1 = 180 - (180 * activePercent) / 100;
  const a2 = a1 - (180 * inactivePercent) / 100;
  const a3 = 0;

  // Only need the two outermost edge points for the outward caps
  const p0 = polar(a0); // far left  → outward cap for activeUsers
  const p3 = polar(a3); // far right → outward cap for inactiveUsers

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">User Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex h-full flex-col items-center justify-between gap-4">
          <div className="relative w-full max-w-[260px]">
            <svg
              viewBox="0 0 240 150"
              className="h-auto w-full"
              aria-label="User overview gauge"
            >
              <defs>
                <pattern
                  id="inactiveHatch"
                  patternUnits="userSpaceOnUse"
                  width="10"
                  height="10"
                  patternTransform="rotate(45)"
                >
                  <rect width="10" height="10" fill="hsl(var(--background))" />
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="10"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="3"
                  />
                </pattern>
                <filter
                  id="softShadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="1.5"
                    stdDeviation="1"
                    floodColor="hsl(var(--foreground))"
                    floodOpacity="0.08"
                  />
                </filter>
              </defs>

              {/* 1. Base track — full semicircle muted */}
              <path
                d={arc(a0, a3)}
                fill="none"
                stroke="hsl(var(--muted) / 0.55)"
                strokeWidth={strokeW}
                strokeLinecap="butt"
                filter="url(#softShadow)"
              />

              {/* 2. Inactive users segment — butt both ends */}
              <path
                d={arc(a1, a2)}
                fill="none"
                stroke="url(#inactiveHatch)"
                strokeWidth={strokeW}
                strokeLinecap="butt"
              />

              {/* 3. Active users segment — butt both ends, drawn on top */}
              <path
                d={arc(a0, a1)}
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth={strokeW}
                strokeLinecap="butt"
              />

              {/* 
                Only 2 manual circles — one at each outer edge.
                NO circle at a1 or a2 (the inner boundaries) — that's what was causing the blobs.
              */}
              {/* Outward cap: far left of active users arc */}
              <circle
                cx={p0.x}
                cy={p0.y}
                r={strokeR}
                fill="hsl(var(--primary))"
              />
              {/* Outward cap: far right of inactive users arc */}
              <circle
                cx={p3.x}
                cy={p3.y}
                r={strokeR}
                fill="url(#inactiveHatch)"
              />
            </svg>

            {/* Center label */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center translate-y-7">
                <div className="text-5xl font-semibold tracking-tight leading-none">
                  {isLoading ? "..." : `${activePercent}%`}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Active Users
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex w-full items-center justify-center gap-5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--primary))" }}
              />
              <span>Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: "hsl(var(--muted-foreground) / 0.4)",
                }}
              />
              <span>Total Users</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full border"
                style={{
                  backgroundColor: "hsl(var(--background))",
                  backgroundImage:
                    "repeating-linear-gradient(45deg, hsl(var(--muted-foreground)) 0 2px, transparent 2px 6px)",
                }}
              />
              <span>Inactive Users</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
