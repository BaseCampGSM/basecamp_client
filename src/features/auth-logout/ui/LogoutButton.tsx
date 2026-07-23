"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/entities/user";
import { Button } from "@/shared/ui";

export function LogoutButton() {
  const router = useRouter();
  const { signOut } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
    >
      로그아웃
    </Button>
  );
}
