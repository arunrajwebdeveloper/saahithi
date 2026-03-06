import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Outlet } from "react-router-dom";
import { dashboardRoutes } from "./dashboard.routes";
import { ROLES } from "@/types/user.types";

export const protectedRoutes = [
  {
    element: <ProtectedRoute requiredRole={ROLES.ADMIN} />,
    children: [
      {
        path: "dashboard",
        element: <Outlet />, // have a custom layout use here and outlet  moove to layout
        children: dashboardRoutes,
      },
    ],
  },
];
