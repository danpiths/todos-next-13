"use client";

import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TodoCompledtedSwitch({
  todoCompleted,
  todoId,
}: {
  todoCompleted: boolean;
  todoId: string;
}) {
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const router = useRouter();

  async function changeCompleted() {
    setLoading(true);
    await clientAuthedFetch({
      apiToCall: "/changeCompleted",
      method: "POST",
      getToken,
      body: { id: todoId, completed: !todoCompleted },
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="completed"
        checked={todoCompleted}
        onClick={changeCompleted}
        disabled={loading}
      />
      <Label htmlFor="completed">Completed?</Label>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
}

export type ChangeCompletedBody = {
  id: string;
  completed: boolean;
};
