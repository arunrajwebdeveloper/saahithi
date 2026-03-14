import { Search, X } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-b-slate-200">
      <div className="px-6 h-14 w-full">
        <div className="h-full w-full relative">
          <Search
            size={20}
            className="absolute text-gray-800 top-1/2 left-0 transform -translate-y-1/2 z-2"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-full w-full border-0 ring-0 outline-0 text-base text-gray-800 px-8"
          />
          <div className="absolute text-gray-600 top-1/2 right-0 transform -translate-y-1/2 z-2">
            <X size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
