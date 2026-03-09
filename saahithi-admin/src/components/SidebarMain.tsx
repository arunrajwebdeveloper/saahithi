import BrandLogo from "./BrandLogo";
import { NavLinks } from "./NavLinks";
import { ProfileSummaryDropdown } from "./ProfileSummaryDropdown";
import { Sidebar } from "./ui/sidebar";
import { sidebarNavigationList } from "@/assets/sidebarNavigationList";

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
          <NavLinks items={sidebarNavigationList} />
          <div className="mb-16 mt-4 ps-4">
            <ProfileSummaryDropdown />
          </div>
        </div>
      </aside>
    </Sidebar>
  );
};

export default SidebarMain;
