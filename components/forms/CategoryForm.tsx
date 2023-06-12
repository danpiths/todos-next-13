"use client";

import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const { getToken } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await clientAuthedFetch({
      apiToCall: "/addUserCategory",
      method: "POST",
      getToken,
      body: { name },
    });
    setName("");
    router.refresh();
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
            success && setSuccess(false);
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
