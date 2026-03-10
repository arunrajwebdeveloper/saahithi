import BrandLogo from "@/components/BrandLogo";
import type { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen select-none overflow-hidden flex bg-[url('./auth-banner.avif')] w-full bg-no-repeat bg-cover bg-center">
      <div className="w-110 m-auto bg-card p-6 rounded-lg shadow-2xl">
        <div className="my-3">
          <BrandLogo
            short
            className="h-5 w-max align-middle text-foreground mx-auto"
          />
        </div>
        {children}
        <div className="text-center py-2">
          <p className="text-xs">&copy;{new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
