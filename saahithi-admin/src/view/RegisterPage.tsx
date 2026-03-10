import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "@/layout/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register, isRegisterLoading, registerError } = useAuth();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    register({ firstName, lastName, email, password });
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="text-2xl font-bold text-left">Create Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              id="fname"
              type="text"
              placeholder="First Name *"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-6 border-2 rounded-lg"
            />
          </div>

          <div>
            <Input
              id="lname"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-6 border-2 rounded-lg"
            />
          </div>

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

          <div>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password *"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-6 border-2 rounded-lg"
            />
          </div>

          <Button
            type="submit"
            disabled={isRegisterLoading}
            className="w-full px-4 py-6 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRegisterLoading ? "Creating account..." : "Create Account"}
          </Button>

          <div className="flex items-center gap-2 text-sm font-medium mt-6">
            <p> Already have an account?</p>
            <Link className="underline" to="/login">
              Sign in
            </Link>
          </div>

          {registerError && (
            <div className="bg-red-50 text-red-600 p-3 rounded">
              {(registerError as any)?.response?.data?.message ||
                "Registration failed"}
            </div>
          )}
        </form>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
