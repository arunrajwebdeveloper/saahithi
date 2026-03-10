import { useLocation } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { ModeToggle } from "./ModeToggle";
import { RangeFilterButtons } from "./RangeFilterButtons";
import { SidebarTrigger } from "./ui/sidebar";

const HeaderMain = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="w-full h-16 sticky top-0 z-40 bg-card border-b border-b-slate-200 dark:border-b-gray-800">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ms-2 z-10">
        <SidebarTrigger />
      </div>
      <div className="max-w-11/12 lg:max-w-10/12 px-2 lg:px-4 mx-auto h-full flex justify-between items-center">
        <div className="flex items-center">
          <BrandLogo
            short
            className="h-5 w-max align-middle text-foreground select-none pointer-events-none hidden md:block"
          />
          <p className="text-base text-foreground ps-4 border-s ms-4 hidden md:block border-s-gray-600 mb-0 select-none pointer-events-none">
            Admin
          </p>
          {/* <p className="text-base text-foreground mb-0">Admin</p> */}
        </div>
        {isDashboard && (
          <div>
            <RangeFilterButtons />
          </div>
        )}
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
