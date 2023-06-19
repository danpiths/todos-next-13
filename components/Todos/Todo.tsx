import { UserTodos } from "@/app/api/(todos)/getUserTodos/route";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { P } from "@/ui/typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import TodoCompledtedSwitch from "./TodoCompledtedSwitch";
import TodoX from "./TodoX";
import TodoCombobox from "./TodoCombobox";
import { authedFetch } from "@/lib/authedFetch";
import { UserCategories } from "@/app/api/(categories)/getUserCategories/route";

dayjs.extend(relativeTime);

async function getUserCategories() {
  const res = await authedFetch({
    apiToCall: "getUserCategories",
    tags: ["user-categories"],
    method: "GET",
  });
  return res.json();
}

export default async function Todo({
  todo,
}: {
  todo: UserTodos["data"][number];
}) {
  const { data: userCategories }: UserCategories = await getUserCategories();

  const comboboxCategories = userCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <Card className="relative first:mt-5 last:mb-3">
      <CardHeader>
        <CardTitle
          className={`${
            todo.completed && "text-muted-foreground line-through"
          }`}
        >
          {todo.title}
        </CardTitle>
        <CardDescription>{dayjs(todo.createdAt).fromNow()}</CardDescription>
        <TodoX
          todoCompleted={todo.completed}
          todoId={todo.id}
          className="absolute right-[0.4rem] top-0 p-2"
        />
      </CardHeader>
      <CardContent>
        <P
          className={`${
            todo.completed && "text-muted-foreground line-through"
          }`}
        >
          {todo.description}
        </P>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 lg:flex-row lg:items-center">
        <TodoCompledtedSwitch todoCompleted={todo.completed} todoId={todo.id} />
        <TodoCombobox
          comboboxCategories={comboboxCategories}
          todoId={todo.id}
          todoCategory={todo.categoryId}
        />
      </CardFooter>
    </Card>
  );
}
