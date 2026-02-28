import { Plus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useDashboardProducts,
  type DashboardProduct,
} from "@/hooks/use-dashboard";

// we reuse the same icon set; choose one arbitrarily or by category later
const DefaultIcon = Sparkles;

export function ProjectListCard() {
  const { data: products = [], isLoading, isError } = useDashboardProducts();

  return (
    <Card className="shadow-sm h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Products</CardTitle>
        <Button variant="outline" size="sm" className="h-9 rounded-xl">
          <Plus className="mr-2 h-4 w-4" />
          New
        </Button>
      </CardHeader>
      <CardContent className="flex-1">
        {isError && (
          <div className="text-red-600">Failed to load products.</div>
        )}
        <div className="space-y-3">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 animate-pulse rounded-2xl bg-muted"
                />
              ))
            : products.map((p: DashboardProduct) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 rounded-2xl border bg-card p-3"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-muted/60">
                    <DefaultIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold">
                      {p.name}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {p.category}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-muted-foreground">
                    ${p.price}
                  </div>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
}
