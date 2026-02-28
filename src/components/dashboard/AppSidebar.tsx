import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  CalendarDays,
  CheckSquare,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type SidebarItem = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  badge?: string;
  path?: string;
};

const menuItems: SidebarItem[] = [
  { title: "Dashboard", icon: LayoutGrid, path: "/" },
  { title: "Tasks", icon: CheckSquare, badge: "12", path: "/tasks" },
  { title: "Calendar", icon: CalendarDays, path: "/calendar" },
  { title: "Analytics", icon: BarChart3, path: "/analytics" },
  { title: "Team", icon: Users, path: "/team" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({ title: "Signed out", description: "You have been logged out." });
    navigate("/login");
  };

  const generalItems: SidebarItem[] = [
    { title: "Settings", icon: Settings, path: "/settings" },
    { title: "Help", icon: HelpCircle, path: "/help" },
    { title: "Logout", icon: LogOut, onClick: handleLogout },
  ];

  const isActive = (path?: string) => !!path && location.pathname === path;

  const renderItem = (item: SidebarItem) => {
    const active = isActive(item.path);
    return (
      <SidebarMenuItem key={item.title} className="relative">
        {active && (
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary"
            style={{
              width: "6px",
              height: "32px",
              borderRadius: "0 4px 4px 0",
            }}
          />
        )}
        <SidebarMenuButton
          onClick={item.onClick ?? (() => item.path && navigate(item.path))}
          tooltip={item.title}
          className={cn(
            "mx-2 rounded-xl px-3 py-2 text-md transition-colors",
            active
              ? "font-semibold text-primary"
              : "hover:bg-sidebar-accent/60",
          )}
        >
          <item.icon
            className={cn(
              isCollapsed ? "h-4 w-4" : "mr-3 h-4 w-4",
              active ? "text-primary" : "",
            )}
          />
          {!isCollapsed && <span className="flex-1">{item.title}</span>}
          {!isCollapsed && item.badge && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
              {item.badge}
            </span>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r bg-sidebar text-sidebar-foreground"
    >
      <SidebarContent>
        <div className={isCollapsed ? "px-2 py-5" : "px-4 py-5"}>
          <div
            className={
              isCollapsed
                ? "flex items-center justify-center"
                : "flex items-center gap-3"
            }
          >
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <span className="text-sm font-semibold tracking-tight">D</span>
            </div>
            {!isCollapsed && (
              <div className="leading-tight">
                <div className="text-sm font-semibold">Donezo</div>
                <div className="text-xs text-muted-foreground">Workspace</div>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[14px] font-medium tracking-wider text-muted-foreground">
            MENU
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{menuItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[14px] font-medium tracking-wider text-muted-foreground">
            GENERAL
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>{generalItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!isCollapsed && (
        <SidebarFooter className="p-4">
          <div className="relative overflow-hidden rounded-2xl bg-primary text-primary-foreground">
            {/* Same background texture as TimeTrackerCard */}
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

            {/* Content */}
            <div className="relative px-4 py-4">
              <div className="text-sm font-semibold">Download our</div>
              <div className="text-sm font-semibold">Mobile App</div>
              <div className="mt-2 text-xs text-primary-foreground/70">
                Get easy on another way.
              </div>
              <Button className="mt-4 w-full rounded-full  border border-primary-foreground/20 px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-green-700 transition-colors">
                Download
              </Button>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
