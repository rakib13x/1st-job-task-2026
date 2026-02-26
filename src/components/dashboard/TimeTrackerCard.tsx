import { Pause, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function TimeTrackerCard() {
  return (
    <Card className="shadow-sm h-full overflow-hidden">
      <CardContent className="p-0">
        <section
          aria-label="Time Tracker"
          className={
            "relative grid h-full min-h-[220px] place-items-center overflow-hidden rounded-lg " +
            "bg-primary text-primary-foreground"
          }
        >
          {/* Background texture */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                // Deep base + subtle shift
                "linear-gradient(160deg, hsl(var(--primary) / 0.98) 0%, hsl(var(--primary) / 0.72) 45%, hsl(var(--primary) / 0.96) 100%)," +
                // Bright spotlight top-right
                "radial-gradient(900px 480px at 85% 18%, hsl(var(--primary-foreground) / 0.18), transparent 62%)," +
                // Dark pocket bottom-left
                "radial-gradient(700px 420px at 15% 92%, hsl(var(--foreground) / 0.22), transparent 58%)," +
                // Wave texture
                "repeating-radial-gradient(circle at 70% 35%, hsl(var(--primary-foreground) / 0.12) 0 5px, transparent 5px 16px)",
            }}
          />
          {/* Vignette + contrast shaping */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_40%,hsl(var(--foreground)/0.20)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-foreground/20"
          />

          {/* Content */}
          <div className="relative w-full px-6 py-5">
            <header className="flex items-start justify-between">
              <h2 className="text-sm font-semibold tracking-tight">
                Time Tracker
              </h2>
            </header>

            <div className="mt-7 text-center">
              <div className="text-4xl font-semibold tabular-nums tracking-tight md:text-5xl">
                01:24:08
              </div>
              <div className="mt-5 flex items-center justify-center gap-3">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-10 w-10 rounded-full bg-background text-foreground hover:bg-background/90"
                  aria-label="Pause"
                >
                  <Pause className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-10 w-10 rounded-full"
                  aria-label="Stop"
                >
                  <Square className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
