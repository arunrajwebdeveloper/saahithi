import type { ReactNode } from "react";
import HeaderMain from "../HeaderMain";
import SidebarMain from "../SidebarMain";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-dvh w-full bg-slate-100 overflow-hidden flex">
      <SidebarMain />
      <div
        className="w-full h-dvh flex-1 overflow-y-auto overflow-x-hidden 
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-slate-100
              [&::-webkit-scrollbar-thumb]:bg-slate-400"
      >
        <HeaderMain />
        <div className="max-w-10/12 w-full mx-auto px-4 py-20">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
