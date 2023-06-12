"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Switch } from "@/ui/switch";
import { Textarea } from "@/ui/textarea";
import { Plus } from "lucide-react";
import CategoryForm from "./CategoryForm";
import { Combobox } from "@/ui/combobox";
import { Button } from "@/ui/button";
import { useState } from "react";
import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/ui/use-toast";
import { useRouter } from "next/navigation";

export default function TodoForm({
  comboboxCategories,
}: {
  comboboxCategories: {
    value: string;
    label: string;
  }[];
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");

  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  async function deleteCategory(id: string) {
    await clientAuthedFetch({
      apiToCall: "/deleteUserCategory",
      method: "POST",
      getToken,
      body: { id },
    });
    toast({
      description: "Category deleted successfully",
      className: "bg-emerald-800 border-0",
    });
    router.refresh();
  }

  return (
    <form className="mt-10 flex flex-col gap-5 rounded-md border p-5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Wash the dishes..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="It's such a chore ughh..."
          id="description"
          className="resize-none"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="completed" />
        <Label htmlFor="completed">Completed?</Label>
      </div>
      <div className="flex w-full items-center gap-3">
        <Combobox
          options={comboboxCategories}
          typeofOption="category"
          value={category}
          setValue={setCategory}
          deleteOptionFunction={deleteCategory}
        />
        <Dialog>
          <DialogTrigger asChild>
            <button className="rounded-md bg-secondary p-2">
              <Plus />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Category</DialogTitle>
            </DialogHeader>
            <CategoryForm />
          </DialogContent>
        </Dialog>
      </div>
      <Button type="submit" className="self-end">
        Submit
      </Button>
    </form>
  );
}
