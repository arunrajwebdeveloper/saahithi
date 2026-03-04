import { ModeToggle } from "./ModeToggle";

const HeaderMain = () => {
  return (
    <header className="w-full h-16 sticky top-0 px-4 z-40 bg-card border-b border-b-slate-200">
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

        <ModeToggle />
      </div>
    </header>
  );
};

export default HeaderMain;
