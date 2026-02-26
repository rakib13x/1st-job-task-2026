/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DayDatum = {
  day: string;
  value: number;
  variant: "active" | "inactive" | "highlight";
  label?: string;
};

// Matches the reference: 7-day strip with a highlighted day + hatched inactive days.
const data: DayDatum[] = [
  { day: "S", value: 58, variant: "inactive" },
  { day: "M", value: 86, variant: "active" },
  { day: "T", value: 74, variant: "highlight", label: "74%" },
  { day: "W", value: 92, variant: "active" },
  { day: "T", value: 64, variant: "inactive" },
  { day: "F", value: 60, variant: "inactive" },
  { day: "S", value: 62, variant: "inactive" },
];

const chartConfig = {
  value: {
    label: "Completion",
    theme: {
      light: "hsl(var(--primary))",
      dark: "hsl(var(--primary))",
    },
  },
} satisfies ChartConfig;

function PillBarShape(props: any) {
  const { x, y, width, height, payload } = props;
  const v = payload?.variant as DayDatum["variant"] | undefined;

  const fill =
    v === "inactive"
      ? "url(#dayHatch)"
      : v === "highlight"
        ? "hsl(var(--primary) / 0.7)"
        : "hsl(var(--primary))";

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={999}
      ry={999}
      fill={fill}
      className={cn(
        v === "inactive" && "opacity-80",
        v === "highlight" && "drop-shadow-sm",
      )}
    />
  );
}

function HighlightLabel(props: any) {
  const { x, y, width, value, payload } = props;
  if (!payload?.label) return null;

  const cx = x + width / 2;
  const cy = y - 10;

  return (
    <g>
      <rect
        x={cx - 18}
        y={cy - 18}
        width={36}
        height={18}
        rx={8}
        fill="hsl(var(--background))"
        stroke="hsl(var(--border))"
      />
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        className="fill-foreground"
        style={{ fontSize: 10, fontWeight: 600 }}
      >
        {value}%
      </text>
      <circle
        cx={cx}
        cy={cy + 2}
        r={3}
        fill="hsl(var(--background))"
        stroke="hsl(var(--border))"
      />
    </g>
  );
}

export function ProjectAnalyticsCard() {
  const highlightIndex = React.useMemo(
    () => data.findIndex((d) => d.variant === "highlight"),
    [],
  );

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">Project Analytics</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full min-h-56 w-full">
          <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{ left: 8, right: 8, top: 18, bottom: 6 }}
            >
              <defs>
                <pattern
                  id="dayHatch"
                  patternUnits="userSpaceOnUse"
                  width="8"
                  height="8"
                  patternTransform="rotate(45)"
                >
                  <rect width="8" height="8" fill="hsl(var(--background))" />
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="8"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="2"
                  />
                </pattern>
              </defs>

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                className="text-muted-foreground"
              />
              <YAxis hide domain={[0, 100]} />

              <Tooltip
                cursor={false}
                defaultIndex={highlightIndex >= 0 ? highlightIndex : undefined}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const p = payload[0]?.payload as DayDatum;
                  return (
                    <div className="rounded-lg border border-border bg-background px-2 py-1 text-[11px] font-semibold text-foreground shadow-sm">
                      {p.value}%
                    </div>
                  );
                }}
              />

              <Bar dataKey="value" shape={<PillBarShape />} barSize={44}>
                <LabelList dataKey="value" content={<HighlightLabel />} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
