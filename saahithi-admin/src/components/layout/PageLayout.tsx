import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { NavLinks } from "../NavLinks";
import { Archive, Briefcase, Columns2, Compass, FileText } from "lucide-react";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const navMain = [
    {
      title: "Dashboard",
      url: "#",
      icon: Columns2,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: FileText,
    },
    {
      title: "Analytics",
      url: "#",
      icon: Archive,
    },
    {
      title: "Projects",
      url: "#",
      icon: Briefcase,
    },
    {
      title: "Team",
      url: "#",
      icon: Compass,
    },
  ];

  return (
    <div className="h-dvh w-full bg-slate-100 overflow-hidden flex">
      <aside
        className="w-80 h-dvh ps-10 pe-4 overflow-y-auto overflow-x-hidden flex-none border-e border-e-slate-300 bg-slate-100 transition duration-300 
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-slate-100
              [&::-webkit-scrollbar-thumb]:bg-slate-100
              hover:[&::-webkit-scrollbar-track]:bg-slate-100
              hover:[&::-webkit-scrollbar-thumb]:bg-slate-400"
      >
        <NavLinks items={navMain} />
      </aside>
      <div
        className="w-full h-dvh flex-1 overflow-y-auto overflow-x-hidden 
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-slate-100
              [&::-webkit-scrollbar-thumb]:bg-slate-400"
      >
        <header className="w-full h-12.5 sticky top-0 px-4 z-2000 border-b border-b-slate-300 bg-slate-100">
          <div className="max-w-10/12 mx-auto h-full flex justify-between items-center">
            <div className="flex items-center select-none pointer-events-none">
              <img
                className="h-4.5 align-middle"
                src="./sahithi-logo.svg"
                alt="sahithi logo"
                loading="lazy"
              />
              <p className="text-base text-gray-800 ps-4 border-s ms-4 border-s-gray-600 mb-0">
                Admin
              </p>
            </div>
          </div>
        </header>
        <div className="max-w-10/12 w-full mx-auto px-4 py-16">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
