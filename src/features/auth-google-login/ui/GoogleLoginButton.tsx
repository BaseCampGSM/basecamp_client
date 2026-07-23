"use client";

import { Button } from "@/shared/ui";
import { buildGoogleAuthUrl } from "../lib/google-oauth";
import { GoogleIcon } from "./GoogleIcon";

export function GoogleLoginButton() {
  const handleClick = () => {
    window.location.href = buildGoogleAuthUrl();
  };

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleClick}
      className="w-full"
    >
      <GoogleIcon />
      Google로 계속하기
    </Button>
  );
}
