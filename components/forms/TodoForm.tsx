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
import { Loader2, Plus } from "lucide-react";
import CategoryForm from "./CategoryForm";
import { Combobox } from "@/ui/combobox";
import { Button } from "@/ui/button";
import { useState } from "react";
import { clientAuthedFetch } from "@/lib/clientAuthedFetch";
import { useAuth } from "@clerk/nextjs";
import { useToast } from "@/ui/use-toast";
import { useRouter } from "next/navigation";
import { Muted } from "@/ui/typography";

export default function TodoForm({
  comboboxCategories,
  className,
}: {
  comboboxCategories: {
    value: string;
    label: string;
  }[];
  className?: string;
}) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [deleteCategoryLoading, setDeleteCategoryLoading] =
    useState<boolean>(false);
  const [categoryBeingDeleted, setCategoryBeingDeleted] = useState<string>("");

  const { getToken } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  async function deleteCategory(id: string) {
    setDeleteCategoryLoading(true);
    await clientAuthedFetch({
      apiToCall: "/deleteUserCategory",
      method: "POST",
      getToken,
      body: { id },
    });
    toast({
      description: "Category deleted successfully",
      className:
        "bg-[#221411] text-primary-foreground dark:text-primary border-0",
    });
    setDeleteCategoryLoading(false);
    setCategoryId("");
    router.refresh();
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitLoading(true);
    if (title.length <= 0) {
      setSubmitLoading(false);
      return toast({
        title: "Title Required",
        description: "Please enter a title",
        variant: "destructive",
      });
    } else if (title.length > 50) {
      setSubmitLoading(false);
      return toast({
        title: "Title Too Long",
        description: "Please enter a shorter title (50 characters max)",
        variant: "destructive",
      });
    }
    if (description.length >= 250) {
      setSubmitLoading(false);
      return toast({
        title: "Description Too Long",
        description: "Please enter a shorter description (250 characters max)",
        variant: "destructive",
      });
    }
    await clientAuthedFetch({
      apiToCall: "/addUserTodo",
      method: "POST",
      getToken,
      body: {
        title: title.trim(),
        description: description ? description.trim() : null,
        completed,
        categoryId: categoryId ? categoryId : null,
      },
    });
    toast({
      description: "Todo Added",
      className:
        "bg-emerald-600 text-primary-foreground dark:bg-emerald-800 dark:text-primary border-0",
    });
    setTitle("");
    setDescription("");
    setCompleted(false);
    setSubmitLoading(false);
    router.refresh();
  }

  return (
    <form
      className={`mt-2 flex flex-col gap-5 rounded-md border p-5 ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="grid w-full items-center gap-1.5">
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="completed"
          checked={completed}
          onClick={() => setCompleted((prevCompleted) => !prevCompleted)}
        />
        <Label htmlFor="completed">Completed?</Label>
      </div>
      <div>
        <div className="flex w-full items-center gap-3">
          <Combobox
            options={comboboxCategories}
            typeofOption="category"
            value={categoryId}
            setValue={setCategoryId}
            deleteOption={{
              deleteDialogDescription:
                "This action cannot be undone. This will permanently delete your",
              deleteOptionFunction: deleteCategory,
              deleteDialogDescriptionMain:
                "Category and all the Todos related to it.",
              loading: deleteCategoryLoading,
              setLoading: setDeleteCategoryLoading,
              optionBeingDeleted: categoryBeingDeleted,
              setOptionBeingDeleted: setCategoryBeingDeleted,
            }}
          />
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-md bg-secondary p-2">
                <Plus />
              </button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-sm">
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <CategoryForm comboboxCategories={comboboxCategories} />
            </DialogContent>
          </Dialog>
        </div>
        <Muted className="mt-1">
          If no category is selected, it will be assigned to default category
        </Muted>
      </div>
      <Button type="submit" className="self-start" disabled={submitLoading}>
        {submitLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
}

export type TodoFormBody = {
  title: string;
  description?: string;
  completed: boolean;
  categoryId?: string;
};

export type DeleteCategoryBody = {
  id: string;
};
