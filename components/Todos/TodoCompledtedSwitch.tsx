"use client";

import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function TodoCompledtedSwitch({
  todoCompleted,
  todoId,
}: {
  todoCompleted: boolean;
  todoId: string;
}) {
  const { getToken } = useAuth();
  const router = useRouter();

  async function changeCompleted() {
    await clientAuthedFetch({
      apiToCall: "/changeCompleted",
      method: "POST",
      getToken,
      body: { id: todoId, completed: !todoCompleted },
    });
    router.refresh();
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="completed"
        checked={todoCompleted}
        onClick={changeCompleted}
      />
      <Label htmlFor="completed">Completed?</Label>
    </div>
  );
}

export type ChangeCompletedBody = {
  id: string;
  completed: boolean;
};
