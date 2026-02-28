import { Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RemindersCard() {
  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Reminders</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex h-full flex-col justify-between gap-4">
          <div>
            <div className="text-3xl font-semibold leading-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Meeting with Arc Company
            </div>
            <div className="mt-1 text-lg text-muted-foreground">
              Time: 02.00 pm - 04.00 pm
            </div>
          </div>

          <Button className="h-11 w-full rounded-2xl gap-2">
            <Video className="h-4 w-4" />
            Start Meeting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
