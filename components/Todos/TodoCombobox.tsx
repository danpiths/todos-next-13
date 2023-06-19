"use client";

import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { Combobox } from "@/ui/combobox";
import { useToast } from "@/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TodoCombobox({
  comboboxCategories,
  todoId,
  todoCategory,
}: {
  comboboxCategories: {
    value: string;
    label: string;
  }[];
  todoId: string;
  todoCategory: string;
}) {
  const [, setCategoryId] = useState<string>(todoCategory);
  const [loading, setLoading] = useState<boolean>(false);

  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  async function handleChange(currentLabel: string) {
    setLoading(true);
    const currentValue = comboboxCategories.find(
      (category) => category.label.toLowerCase() === currentLabel.toLowerCase()
    )?.value;
    await clientAuthedFetch({
      apiToCall: "/updateTodoCategory",
      method: "POST",
      getToken,
      body: {
        categoryId: currentValue === todoCategory ? null : currentValue,
        todoId,
      },
    });
    toast({
      description: "Category Updated Successfully",
      className:
        "bg-[#221411] text-primary-foreground dark:text-primary border-0",
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Combobox
        options={comboboxCategories}
        setValue={setCategoryId}
        value={todoCategory}
        typeofOption="category"
        onChange={handleChange}
        loading={loading}
      />
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
}

export type CategoryUpdateBody = {
  categoryId: string | null;
  todoId: string;
};
