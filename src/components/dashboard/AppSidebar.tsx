import * as React from "react";
import { useNavigate } from "react-router-dom";
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

type SidebarItem = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  badge?: string;
};

const menuItems: SidebarItem[] = [
  { title: "Dashboard", icon: LayoutGrid },
  { title: "Tasks", icon: CheckSquare, badge: "12" },
  { title: "Calendar", icon: CalendarDays },
  { title: "Analytics", icon: BarChart3 },
  { title: "Team", icon: Users },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({ title: "Signed out", description: "You have been logged out." });
    navigate("/login");
  };

  const generalItems: SidebarItem[] = [
    { title: "Settings", icon: Settings },
    { title: "Help", icon: HelpCircle },
    { title: "Logout", icon: LogOut, onClick: handleLogout },
  ];

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
            {!isCollapsed ? (
              <div className="leading-tight">
                <div className="text-sm font-semibold">Donezo</div>
                <div className="text-xs text-muted-foreground">Workspace</div>
              </div>
            ) : null}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[11px] font-medium tracking-wider text-muted-foreground">
            MENU
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={item.onClick}
                    tooltip={item.title}
                    className="mx-2 rounded-xl px-3 py-2 text-sm hover:bg-sidebar-accent/60"
                  >
                    <item.icon
                      className={isCollapsed ? "h-4 w-4" : "mr-3 h-4 w-4"}
                    />
                    {!isCollapsed ? (
                      <span className="flex-1">{item.title}</span>
                    ) : null}
                    {!isCollapsed && item.badge ? (
                      <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                        {item.badge}
                      </span>
                    ) : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[11px] font-medium tracking-wider text-muted-foreground">
            GENERAL
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {generalItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={item.onClick}
                    tooltip={item.title}
                    className="mx-2 rounded-xl px-3 py-2 text-sm hover:bg-sidebar-accent/60"
                  >
                    <item.icon
                      className={isCollapsed ? "h-4 w-4" : "mr-3 h-4 w-4"}
                    />
                    {!isCollapsed ? (
                      <span className="flex-1">{item.title}</span>
                    ) : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!isCollapsed ? (
        <SidebarFooter className="p-4">
          <div className="rounded-2xl bg-card p-4 shadow-sm">
            <div className="text-sm font-medium">Download our</div>
            <div className="text-sm font-medium">Mobile App</div>
            <div className="mt-3 text-xs text-muted-foreground">
              Get easy on another way.
            </div>
            <button className="mt-4 w-full rounded-xl bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Download
            </button>
          </div>
        </SidebarFooter>
      ) : null}
    </Sidebar>
  );
}
