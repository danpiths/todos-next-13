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

dayjs.extend(relativeTime);

export default function Todo({ todo }: { todo: UserTodos["data"][number] }) {
  return (
    <Card className="relative">
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
      <CardFooter>
        <TodoCompledtedSwitch todoCompleted={todo.completed} todoId={todo.id} />
      </CardFooter>
    </Card>
  );
}
