import { Navigate, Outlet } from "react-router-dom";
import PageLayout from "@/layout/PageLayout";
import { useAppSelector } from "@/hooks/hooks";

interface ProtectedRouteProps {
  requiredRole?: string;
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, user } = useAppSelector(
    (state) => state.auth,
  );

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access control
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

// Public Route (redirects to dashboard if already logged in)
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  // const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
