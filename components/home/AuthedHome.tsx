import { H1 } from "@/ui/typography";
import TodoForm from "../forms/TodoForm";
import { authedFetch } from "@/lib/authedFetch";
import { UserCategories } from "@/app/api/(categories)/getUserCategories/route";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import { Button } from "@/ui/button";
import Todos from "../Todos/Todos";
import { UserTodos } from "@/app/api/(todos)/getUserTodos/route";
import Todo from "../Todos/Todo";

async function getUserCategories() {
  const res = await authedFetch({
    apiToCall: "getUserCategories",
    tags: ["user-categories"],
    method: "GET",
  });
  return res.json();
}

async function getUserTodos() {
  const res = await authedFetch({
    apiToCall: "getUserTodos",
    tags: ["user-todos"],
    method: "GET",
  });
  return res.json();
}

export default async function AuthedHome() {
  // const { data: userCategories }: UserCategories = await getUserCategories();
  const userCategoriesFetch = getUserCategories();
  const userTodosFetch = getUserTodos();

  const [userCategoriesResponse, userTodosResponse]: [
    UserCategories,
    UserTodos
  ] = await Promise.all([userCategoriesFetch, userTodosFetch]);

  const userCategories = userCategoriesResponse.data;
  const userTodos = userTodosResponse.data;

  const comboboxCategories = userCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="flex flex-1 flex-col">
      <H1>
        Your <span className="underline underline-offset-4">Todos</span>
      </H1>
      <Collapsible className="mt-5">
        <Button asChild variant="secondary">
          <CollapsibleTrigger>Add a todo</CollapsibleTrigger>
        </Button>
        <CollapsibleContent>
          <TodoForm comboboxCategories={comboboxCategories} />
        </CollapsibleContent>
      </Collapsible>
      <Todos className="mt-5 flex flex-col gap-2">
        {userTodos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </Todos>
    </div>
  );
}
