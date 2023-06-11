import { H1 } from "@/ui/typography";
import TodoForm from "../forms/TodoForm";
import { authedFetch } from "@/lib/authedFetch";
import { UserCategories } from "@/app/api/getUserCategories/route";

async function getUserCategories() {
  const res = await authedFetch({
    apiToCall: "getUserCategories",
    tags: ["user-categories"],
    method: "GET",
  });
  return res.json();
}

export default async function AuthedHome() {
  const { data: userCategories }: UserCategories = await getUserCategories();

  const comboboxCategories = userCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="flex flex-1 flex-col">
      <H1>
        Your <span className="underline underline-offset-4">Todos</span>
      </H1>
      <TodoForm comboboxCategories={comboboxCategories} />
    </div>
  );
}
