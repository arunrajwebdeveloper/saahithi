import { lazy } from "react";
import { PublicRoute } from "../components/auth/ProtectedRoute";

const LoginPage = lazy(() => import("@/view/LoginPage"));
const RegisterPage = lazy(() => import("@/view/RegisterPage"));

export const publicRoutes = [
  {
    path: "login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
];
