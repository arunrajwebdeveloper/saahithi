import { createBrowserRouter, Navigate } from "react-router-dom";
import { publicRoutes } from "./public.routes";
import { protectedRoutes } from "./protected.routes";
import NoteFound from "../view/NoteFound";
import RootLayout from "@/layout/RootLayout";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      ...publicRoutes,
      ...protectedRoutes,
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "*",
        element: <NoteFound />,
      },
    ],
  },
]);
