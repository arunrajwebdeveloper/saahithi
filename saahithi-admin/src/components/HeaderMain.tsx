import BrandLogo from "./BrandLogo";
import { ModeToggle } from "./ModeToggle";
import { RangeFilterButtons } from "./RangeFilterButtons";
import { SidebarTrigger } from "./ui/sidebar";

const HeaderMain = () => {
  return (
    <header className="w-full h-16 sticky top-0 px-4 z-40 bg-card border-b border-b-slate-200 dark:border-b-gray-800">
      <div className="max-w-10/12 mx-auto h-full flex justify-between items-center">
        <div className="flex items-center ">
          <SidebarTrigger />
          <BrandLogo className="h-5 w-max align-middle text-foreground select-none pointer-events-none" />
          <p className="text-base text-foreground ps-4 border-s ms-4 border-s-gray-600 mb-0 select-none pointer-events-none">
            Admin
          </p>
          {/* <p className="text-base text-foreground mb-0">Admin</p> */}
        </div>
        <div>
          <RangeFilterButtons />
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
