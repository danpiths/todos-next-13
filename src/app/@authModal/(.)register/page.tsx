"use client";

export const runtime = "edge";

import TodoSignUp from "@/components/Auth/TodoSignUp";
import { useRouter } from "next/navigation";

export default async function Page() {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 backdrop-blur-sm transition-all duration-100 sm:items-center"
      onClick={() => {
        router.back();
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <TodoSignUp />
      </div>
    </div>
  );
}
