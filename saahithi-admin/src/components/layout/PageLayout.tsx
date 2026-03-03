import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  return (
    <div className="h-dvh w-full bg-slate-100 overflow-hidden flex">
      <aside className="w-80 flex-none bg-white">Sidebar</aside>
      <div className="w-full h-dvh flex-1 overflow-y-auto overflow-x-hidden">
        <header className="w-full h-12.5 sticky top-0 bg-white px-4 z-2000">
          <div className="max-w-10/12 mx-auto h-full flex justify-between items-center">
            <h1 className="text-2xl m-0">
              Sahithi | <small>Admin</small>
            </h1>
          </div>
        </header>
        <div className="max-w-10/12 w-full mx-auto px-4 py-16">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
