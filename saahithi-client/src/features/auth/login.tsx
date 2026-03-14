"use client";

import { useAuth } from "@/providers/AuthProvider";
import authApi from "@/services/auth.services";
import userApi from "@/services/user.services";
import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";

export default function Login() {
  const router = useRouter();
  const { setUser } = useAuth();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    await authApi.login({ email, password });

    const user = await userApi.getCurrentUser();
    setUser(user as any);
    router.push("/feeds");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        defaultValue={"arunrajcvkl@gmail.com"}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        defaultValue={"12345678"}
      />
      <button type="submit">Login</button>
    </form>
  );
}
