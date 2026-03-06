import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function NavLinks({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="space-y-3">
          {items.map((item) => {
            const isActive =
              item.url === "/dashboard"
                ? location.pathname === "/dashboard"
                : location.pathname.startsWith(item.url);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={() => (
                    <Link
                      to={item.url}
                      className={cn(
                        "flex items-center gap-x-5 py-2 hover:opacity-80 font-medium outline-0 border-0 ring-0 transition-colors cursor-pointer",
                        isActive ? "text-emerald-600" : "text-foreground",
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  )}
                  isActive={isActive}
                  size={"lg"}
                  className="outline-0 border-0 ring-0 font-medium cursor-pointer"
                >
                  {/* {item.icon && <item.icon />}
                  <span>{item.title}</span> */}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
