"use client";

import { toggleScheme } from "@/utils/colorScheme";
import { Button } from "@/ui//button";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

export default async function ColorSchemeButton() {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      className="p-2"
      onClick={async () => {
        await toggleScheme();
        router.refresh();
      }}
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  );
}
