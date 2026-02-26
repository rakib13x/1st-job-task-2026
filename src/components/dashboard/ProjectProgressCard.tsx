/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProjectProgressCard() {
  // Static values for visual match; we can wire to real data later.
  const endedPercent = 41;

  // Visual segments (sum = 100). Tuned to match the reference proportions.
  const completed = 62;
  const inProgress = 18;
  const pending = 20;

  const segments = [
    {
      key: "completed",
      label: "Completed",
      value: completed,
      stroke: "hsl(var(--primary) / 0.85)",
    },
    {
      key: "inProgress",
      label: "In Progress",
      value: inProgress,
      stroke: "hsl(var(--primary))",
    },
    {
      key: "pending",
      label: "Pending",
      value: pending,
      stroke: "url(#pendingHatch)",
    },
  ] as const;

  // Recharts-like dash technique for SVG arcs.
  let start = 0;

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Project Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex h-full flex-col items-center justify-between gap-4">
          <div className="relative w-full max-w-[260px]">
            <svg
              viewBox="0 0 240 150"
              className="h-auto w-full"
              aria-label="Project progress gauge"
            >
              <defs>
                <pattern
                  id="pendingHatch"
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

                {/* Only show the OUTER half of round caps (cuts off the inner half cleanly). */}
                <clipPath id="outerOnlyCapClip">
                  <path
                    d={`M 0 0 H 240 V 150 H 0 Z M 120 120 m -66 0 a 66 66 0 1 0 132 0 a 66 66 0 1 0 -132 0`}
                    fillRule="evenodd"
                  />
                </clipPath>

                {/* subtle inner shadow feel */}
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

              {/* Base track */}
              <path
                d="M 40 120 A 80 80 0 0 1 200 120"
                pathLength={100}
                fill="none"
                stroke="hsl(var(--muted) / 0.55)"
                strokeWidth={30}
                strokeLinecap="butt"
                filter="url(#softShadow)"
              />

              {/* Segments (true arc paths) */}
              {(() => {
                const cx = 120;
                const cy = 120;
                const r = 80;
                const strokeW = 30;
                const strokeR = strokeW / 2;

                const polar = (angleDeg: number) => {
                  const a = (Math.PI / 180) * angleDeg;
                  // Inverted y so 180→0 draws the TOP half.
                  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
                };

                const arc = (startDeg: number, endDeg: number) => {
                  const start = polar(startDeg);
                  const end = polar(endDeg);
                  const largeArcFlag =
                    Math.abs(endDeg - startDeg) <= 180 ? "0" : "1";
                  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
                };

                // Semi-circle goes from 180deg (left) to 0deg (right).
                const total = 180;
                const a0 = 180;
                const a1 = 180 - (total * completed) / 100;
                const a2 = a1 - (total * inProgress) / 100;
                const a3 = 0;

                const p0 = polar(a0);
                const p2 = polar(a2);
                const p3 = polar(a3);

                // Outer-only cap via clipping (no inward bulge).
                const capClip = "url(#outerOnlyCapClip)";

                return (
                  <>
                    {/* Flat joins everywhere (no inward rounding at boundaries). */}
                    <path
                      d={arc(a0, a1)}
                      fill="none"
                      stroke="hsl(var(--primary) / 0.85)"
                      strokeWidth={strokeW}
                      strokeLinecap="butt"
                    />
                    <path
                      d={arc(a1, a2)}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth={strokeW}
                      strokeLinecap="butt"
                    />
                    <path
                      d={arc(a2, a3)}
                      fill="none"
                      stroke="url(#pendingHatch)"
                      strokeWidth={strokeW}
                      strokeLinecap="butt"
                    />

                    {/* Outer-only rounded caps (clipped so they never round inward). */}
                    <g clipPath={capClip}>
                      <circle
                        cx={p0.x}
                        cy={p0.y}
                        r={strokeR}
                        fill="hsl(var(--primary) / 0.85)"
                      />
                      <circle
                        cx={p2.x}
                        cy={p2.y}
                        r={strokeR}
                        fill="hsl(var(--primary))"
                      />
                      <circle
                        cx={p3.x}
                        cy={p3.y}
                        r={strokeR}
                        fill="url(#pendingHatch)"
                      />
                    </g>
                  </>
                );
              })()}
            </svg>

            {/* Center label */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              <div className="text-center translate-y-7">
                <div className="text-5xl font-semibold tracking-tight leading-none">
                  {endedPercent}%
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Project Ended
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex w-full items-center justify-center gap-5 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--primary) / 0.85)" }}
              />
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--primary))" }}
              />
              <span>In Progress</span>
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
              <span>Pending</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
