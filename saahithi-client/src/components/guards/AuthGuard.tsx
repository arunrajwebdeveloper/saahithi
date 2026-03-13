"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <button onClick={() => router.push("/login")}>Login to continue</button>
    );
  }

  return <>{children}</>;
}

{
  /* <AuthGuard>
  <button>Create Post</button>
</AuthGuard> */
}

{
  /* <AuthGuard>
  <FollowButton authorId={author.id} />
</AuthGuard> */
}
