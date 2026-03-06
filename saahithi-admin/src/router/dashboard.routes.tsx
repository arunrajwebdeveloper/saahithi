import { lazy } from "react";

const Dashboard = lazy(() => import("@/view/Dashboard"));
const ProfilePage = lazy(() => import("@/view/ProfilePage"));

export const dashboardRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "profile",
    element: <ProfilePage />,
  },
];
