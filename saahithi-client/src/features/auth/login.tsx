"use client";

import { http } from "@/lib/api/http";
import { useAuth } from "@/providers/auth-provider";

export default function Login() {
  const { setUser } = useAuth();

  async function handleLogin() {
    await http.post("/auth/login", {
      email: "test@mail.com",
      password: "123456",
    });

    const user = await http.get("/auth/me");

    setUser(user as any); // rewrite it
  }

  return <button onClick={handleLogin}>Login</button>;
}
