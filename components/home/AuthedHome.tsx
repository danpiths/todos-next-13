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
import { UserTodos } from "@/app/api/(todos)/getUserTodos/route";
import Categories from "../Categories/Categories";
import Category from "../Categories/Category";

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
    <div className="mt-5 flex flex-1 flex-col">
      <H1>
        Your <span className="underline underline-offset-4">Todos</span>
      </H1>
      <div className="lg:flex lg:gap-10">
        <Collapsible className="mt-5 lg:hidden">
          <Button asChild variant="secondary">
            <CollapsibleTrigger>Add a todo</CollapsibleTrigger>
          </Button>
          <CollapsibleContent>
            <TodoForm comboboxCategories={comboboxCategories} />
          </CollapsibleContent>
        </Collapsible>
        <TodoForm
          comboboxCategories={comboboxCategories}
          className="hidden lg:sticky lg:top-24 lg:mt-7 lg:flex lg:max-w-xl lg:self-start"
        />
        <Categories className="mt-5 flex flex-col gap-5 lg:flex-1">
          <Category
            categoryName="Default"
            categoryTodos={userTodos.filter((todo) => todo.categoryId === null)}
          />
          {userCategories.map((category) => (
            <Category
              categoryName={category.name}
              key={category.id}
              categoryTodos={userTodos.filter(
                (todo) => todo.categoryId === category.id
              )}
            />
          ))}
        </Categories>
      </div>
    </div>
  );
}
