import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoginLoading, loginError } = useAuth();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="text-2xl font-bold text-left">Sign in</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="Email Address *"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-6 border-2 rounded-lg"
            />
          </div>

          <div>
            <Input
              id="password"
              type="password"
              placeholder="Password *"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-6 border-2 rounded-lg"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoginLoading}
            className="w-full px-4 py-6 cursor-pointer bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoginLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="flex items-center gap-2 text-sm font-medium mt-6">
            <p>Don't have an account?</p>
            <Link className="underline" to="/register">
              Create an account
            </Link>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded">
              {(loginError as any)?.response?.data?.message || "Login failed"}
            </div>
          )}
        </form>
      </div>

      <div className="text-center py-4">
        <p className="text-white text-xs">&copy;{new Date().getFullYear()}</p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
