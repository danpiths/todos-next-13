"use client";

import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useToast } from "@/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { StatusCodes } from "http-status-codes";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryForm({
  comboboxCategories,
}: {
  comboboxCategories: {
    value: string;
    label: string;
  }[];
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    if (name.length <= 0) {
      setLoading(false);
      return toast({
        title: "Category Required",
        description: "Please enter a category name",
        variant: "destructive",
      });
    }
    if (
      comboboxCategories.find(
        (category) => category.label.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      setName("");
      setLoading(false);
      return toast({
        title: "Category Already Exists",
        description: "Please enter a unique category name",
        variant: "destructive",
      });
    }
    const res = await clientAuthedFetch({
      apiToCall: "/addUserCategory",
      method: "POST",
      getToken,
      body: { name: name.trim() },
    });
    if (res.status === StatusCodes.CONFLICT) {
      setName("");
      setLoading(false);
      return toast({
        title: "Category Already Exists",
        description: "Please enter a unique category name",
        variant: "destructive",
      });
    }
    toast({
      title: "Category Added",
      description: "You can now use it for your todos",
      className:
        "bg-emerald-600 text-primary-foreground dark:bg-emerald-800 dark:text-primary border-0",
    });
    setName("");
    setLoading(false);
    router.refresh();
  }

  return (
    <form className="mt-5 flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => {
            return setName(e.target.value);
          }}
          placeholder="Office..."
          name="name"
        />
      </div>
      <Button type="submit" disabled={loading} className="self-end">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Add
        Category
      </Button>
    </form>
  );
}

export type CategoryFormBody = { name: string };
