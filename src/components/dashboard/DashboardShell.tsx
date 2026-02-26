import * as React from "react";
import { Bell, Mail, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background">
        <div className="flex min-h-screen w-full">
          <AppSidebar />

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-16 items-center gap-3 px-4 md:px-6">
                <SidebarTrigger className="rounded-xl" />

                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search task"
                    className="h-11 rounded-2xl pl-10 pr-16"
                    aria-label="Search"
                  />
                  <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border bg-muted px-2 py-1 text-[10px] text-muted-foreground md:block">
                    ⌘F
                  </kbd>
                </div>

                <button
                  className="grid h-11 w-11 place-items-center rounded-2xl border bg-card text-foreground shadow-sm hover:bg-accent"
                  aria-label="Inbox"
                >
                  <Mail className="h-4 w-4" />
                </button>
                <button
                  className="grid h-11 w-11 place-items-center rounded-2xl border bg-card text-foreground shadow-sm hover:bg-accent"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                </button>

                <div className="ml-1 flex items-center gap-3 rounded-2xl border bg-card px-3 py-2 shadow-sm">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-muted text-xs">
                      TM
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden leading-tight md:block">
                    <div className="text-sm font-semibold">Totok Michael</div>
                    <div className="text-xs text-muted-foreground">
                      tmichael02@gmail.com
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
