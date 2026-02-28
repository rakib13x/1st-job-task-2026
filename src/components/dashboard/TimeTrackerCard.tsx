import { Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function TimeTrackerCard() {
  return (
    <Card className="shadow-sm h-full overflow-hidden">
      <CardContent className="p-0 h-full">
        <section
          aria-label="Time Tracker"
          className="relative grid h-full place-items-center overflow-hidden rounded-lg bg-primary text-primary-foreground"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(160deg, hsl(var(--primary) / 0.98) 0%, hsl(var(--primary) / 0.72) 45%, hsl(var(--primary) / 0.96) 100%)," +
                "radial-gradient(900px 480px at 85% 18%, hsl(var(--primary-foreground) / 0.18), transparent 62%)," +
                "radial-gradient(700px 420px at 15% 92%, hsl(var(--foreground) / 0.22), transparent 58%)," +
                "repeating-radial-gradient(circle at 70% 35%, hsl(var(--primary-foreground) / 0.12) 0 5px, transparent 5px 16px)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent_40%,hsl(var(--foreground)/0.20)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-foreground/20"
          />
          <div className="relative w-full px-4 py-3">
            <header>
              <h2 className="text-xs font-semibold tracking-tight">
                Time Tracker
              </h2>
            </header>
            <div className="mt-3 text-center">
              <div className="text-3xl font-semibold tabular-nums tracking-tight">
                01:24:08
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <Button
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-background text-foreground hover:bg-background/90"
                  aria-label="Pause"
                >
                  <Pause className="h-3 w-3" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8 rounded-full"
                  aria-label="Stop"
                >
                  <Square className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
