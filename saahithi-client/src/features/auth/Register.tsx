"use client";

import authApi from "@/services/auth";
import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";

export default function Register() {
  const router = useRouter();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");

    await authApi.register({ firstName, lastName, email, password });
    router.push("/login");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="firstName" placeholder="First Name" required />
      <input type="text" name="lastName" placeholder="Last Name" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
}
