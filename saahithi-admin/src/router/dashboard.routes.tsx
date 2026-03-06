import { lazy } from "react";

const Dashboard = lazy(() => import("@/view/Dashboard"));
const ContentListPage = lazy(() => import("@/view/ContentListPage"));
const UserListPage = lazy(() => import("@/view/UserListPage"));

export const dashboardRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: "contents",
    element: <ContentListPage />,
  },
  {
    path: "users",
    element: <UserListPage />,
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
