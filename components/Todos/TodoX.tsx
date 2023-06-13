"use client";

import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { Button } from "@/ui/button";
import { useToast } from "@/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TodoX({
  todoCompleted,
  todoId,
}: {
  todoCompleted: boolean;
  todoId: string;
}) {
  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  async function deleteTodo() {
    await clientAuthedFetch({
      apiToCall: "/deleteUserTodo",
      method: "POST",
      getToken,
      body: { id: todoId },
    });
    toast({
      description: "Todo deleted successfully",
      className: "bg-emerald-800 border-0",
    });
    router.refresh();
  }

  return (
    <Button onClick={deleteTodo} variant={"ghost"}>
      <X className={`${todoCompleted && "text-rose-900"}`} />
    </Button>
  );
}

export type DeleteTodoBody = {
  id: string;
};
