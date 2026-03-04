import { Avatar } from "./Avatar";
import { NavLinks } from "./NavLinks";
import { Archive, Briefcase, Columns2, Compass, FileText } from "lucide-react";

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

const SidebarMain = () => {
  return (
    <aside
      className="w-80 h-dvh ps-10 pe-4 overflow-y-auto overflow-x-hidden flex-none bg-white border-e border-e-slate-200 transition duration-300 
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-slate-100
              [&::-webkit-scrollbar-thumb]:bg-slate-100
              hover:[&::-webkit-scrollbar-track]:bg-slate-100
              hover:[&::-webkit-scrollbar-thumb]:bg-slate-400"
    >
      <div className="flex flex-col justify-between h-dvh">
        <div className="mb-10 mt-10 ms-4">
          <img
            className="h-4.5 align-middle"
            src="./sahithi-short-logo.svg"
            alt="sahithi short logo"
            loading="lazy"
          />
        </div>
        <NavLinks items={navMain} />
        <div className="mb-16 mt-4 ps-4">
          <Avatar size="lg" />
        </div>
      </div>
    </aside>
  );
};

export default SidebarMain;
