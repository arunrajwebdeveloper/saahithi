import { AppSpinner } from "@/components/AppSpinner";
import { SessionHandler } from "@/components/auth/SessionHandler";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Suspense fallback={<AppSpinner />}>
      <SessionHandler>
        <Outlet />
      </SessionHandler>
    </Suspense>
  );
}
