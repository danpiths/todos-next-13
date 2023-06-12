"use client";

import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useToast } from "@/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const { getToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (name.length <= 0) {
      toast({
        title: "Category Required",
        description: "Please enter a category name",
        variant: "destructive",
      });
    } else {
      await clientAuthedFetch({
        apiToCall: "/addUserCategory",
        method: "POST",
        getToken,
        body: { name: name.trim() },
      });
      toast({
        title: "Category Added",
        description: "You can now use it for your todos",
        className: "bg-emerald-800 border-0",
      });
      setName("");
      router.refresh();
    }
  }

  return (
    <form
      className="mt-5 flex flex-col items-end gap-5"
      onSubmit={handleSubmit}
    >
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
      <Button type="submit">Add Category</Button>
    </form>
  );
}

export type CategoryFormBody = { name: string };
