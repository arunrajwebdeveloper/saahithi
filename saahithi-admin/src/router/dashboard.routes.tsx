import { lazy } from "react";

const Dashboard = lazy(() => import("@/view/Dashboard"));

export const dashboardRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "contents",
    element: <h1>Contents Page</h1>,
  },
  {
    path: "users",
    element: <h1>Users Page</h1>,
  },
  {
    path: "payments",
    element: <h1>Payments Page</h1>,
  },
  {
    path: "reports",
    element: <h1>Reports Page</h1>,
  },
  {
    path: "logs",
    element: <h1>Logs Page</h1>,
  },
];
