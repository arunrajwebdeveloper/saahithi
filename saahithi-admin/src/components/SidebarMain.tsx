import { Avatar } from "./Avatar";
import BrandLogo from "./BrandLogo";
import { NavLinks } from "./NavLinks";
import { Archive, Briefcase, Columns2, Compass, FileText } from "lucide-react";
import { Sidebar } from "./ui/sidebar";

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

const SidebarMain = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar {...props}>
      <aside
        className="md:w-72 h-dvh ps-10 pe-4 overflow-y-auto overflow-x-hidden flex-none bg-card border-e border-e-slate-200 dark:border-e-gray-800  
              [&::-webkit-scrollbar]:w-1
              [&::-webkit-scrollbar-track]:bg-slate-100
              [&::-webkit-scrollbar-thumb]:bg-slate-100
              hover:[&::-webkit-scrollbar-track]:bg-slate-100
              hover:[&::-webkit-scrollbar-thumb]:bg-slate-400"
      >
        <div className="flex flex-col justify-between h-dvh">
          <div className="mb-10 mt-10 ms-4">
            <BrandLogo
              short
              className="h-5 w-max align-middle text-foreground"
            />
          </div>
          <NavLinks items={navMain} />
          <div className="mb-16 mt-4 ps-4">
            <Avatar size="lg" />
          </div>
        </div>
      </aside>
    </Sidebar>
  );
};

export default SidebarMain;
