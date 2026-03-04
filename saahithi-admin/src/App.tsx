import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "./components/auth/ProtectedRoute";
import OfflineModal from "./components/modal/OfflineModal";
import { SessionHandler } from "./components/auth/SessionHandler";
import { useCookieSupport } from "./hooks/useCookieSupport";
import CookieDisabledModal from "./components/modal/CookieDisabledModal";
import { useAppDispatch } from "./hooks/hooks";
import useWindowWidth from "./hooks/useWindowWidth";
import { setWindowWidth } from "./store/features/windowSlice";
import { AppSpinner } from "./components/AppSpinner";

// Lazy load pages
const LoginPage = lazy(() => import("./view/LoginPage"));
const RegisterPage = lazy(() => import("./view/RegisterPage"));
const Dashboard = lazy(() => import("./view/Dashboard"));
const ProfilePage = lazy(() => import("./view/ProfilePage"));
const UnauthorizedPage = lazy(() => import("./view/UnauthorizedPage"));
const NoteFound = lazy(() => import("./view/NoteFound"));

function App() {
  const dispatch = useAppDispatch();
  const cookiesEnabled = useCookieSupport();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, [windowWidth, dispatch]);

  return (
    <SessionHandler>
      <BrowserRouter>
        <Suspense fallback={<AppSpinner />}>
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Admin only route */}
            {/* <Route element={<ProtectedRoute requiredRole="admin" />}>
                <Route path="/admin" element={<AdminPage />} />
              </Route> */}

            {/* Error routes */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<NoteFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <OfflineModal />
      {!cookiesEnabled && <CookieDisabledModal />}
    </SessionHandler>
  );
}

export default App;
