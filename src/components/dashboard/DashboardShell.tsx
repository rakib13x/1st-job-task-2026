import * as React from "react";
import { Bell, Mail, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({ title: "Signed out", description: "You have been logged out." });
    navigate("/login");
  };

  const userInitials = user?.email
    ? user.email.split("@")[0].substring(0, 2).toUpperCase()
    : "TM";

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
                    placeholder="Search Products"
                    className="h-11 rounded-2xl pl-10 pr-16"
                    aria-label="Search"
                  />
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="ml-1 flex items-center gap-3 rounded-2xl border bg-card px-3 py-2 shadow-sm hover:bg-accent cursor-pointer">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-muted text-xs">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden leading-tight md:block">
                        <div className="text-sm font-semibold">
                          {user?.email.split("@")[0]}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user?.email}
                        </div>
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>

            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
