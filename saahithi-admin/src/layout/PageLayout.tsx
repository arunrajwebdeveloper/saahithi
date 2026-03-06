import HeaderMain from "@/components/HeaderMain";
import SidebarMain from "@/components/SidebarMain";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { ReactNode } from "react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-dvh w-full overflow-hidden flex">
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
          } as React.CSSProperties
        }
      >
        <SidebarMain />
        <SidebarInset>
          <div
            className="w-full h-dvh flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 dark:bg-[#091123]
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-slate-100
              [&::-webkit-scrollbar-thumb]:bg-slate-400"
          >
            <HeaderMain />
            <div className="max-w-11/12 lg:max-w-10/12 w-full mx-auto px-2 lg:px-4 py-20">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default PageLayout;
