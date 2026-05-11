"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthGuard({
  children,
}: Props) {

  const router = useRouter();

  useEffect(() => {

    const token = localStorage.getItem("token");

    // IF NO TOKEN
    if (!token) {
      router.push("/login");
    }

  }, []);

  return <>{children}</>;
}