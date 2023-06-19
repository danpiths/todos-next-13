"use client";

import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { Button } from "@/ui/button";
import { useToast } from "@/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TodoX({
  todoCompleted,
  todoId,
  className,
}: {
  todoCompleted: boolean;
  todoId: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  async function deleteTodo() {
    setLoading(true);
    await clientAuthedFetch({
      apiToCall: "/deleteUserTodo",
      method: "POST",
      getToken,
      body: { id: todoId },
    });
    toast({
      description: "Todo deleted successfully",
      className:
        "bg-emerald-600 text-primary-foreground dark:bg-emerald-800 dark:text-primary border-0",
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <Button
      onClick={deleteTodo}
      variant={"ghost"}
      className={className}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <X className={`${todoCompleted && "text-rose-900"}`} />
      )}
    </Button>
  );
}

export type DeleteTodoBody = {
  id: string;
};
