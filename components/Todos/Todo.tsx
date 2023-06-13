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
    <Card>
      <CardHeader>
        <CardTitle
          className={`${
            todo.completed && "text-muted-foreground line-through"
          } flex items-center justify-between`}
        >
          <span>{todo.title}</span>
          <TodoX todoCompleted={todo.completed} todoId={todo.id} />
        </CardTitle>
        <CardDescription>{dayjs(todo.createdAt).fromNow()}</CardDescription>
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
