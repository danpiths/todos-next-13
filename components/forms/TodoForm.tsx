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

export default function TodoForm({
  comboboxCategories,
}: {
  comboboxCategories: {
    value: number;
    label: string;
  }[];
}) {
  return (
    <form className="mt-10 flex flex-col gap-5 rounded-md border p-5">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="Wash the dishes..." />
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
      <div className="flex items-center gap-3">
        <Combobox options={comboboxCategories} typeofOptions="categories" />
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
    </form>
  );
}
