import { UserTodos } from "@/app/api/(todos)/getUserTodos/route";
import Todo from "../Todos/Todo";
import Todos from "../Todos/Todos";
import { H2, P } from "@/ui/typography";

export default function Category({
  categoryName,
  categoryTodos,
}: {
  categoryName: string;
  categoryTodos: UserTodos["data"];
}) {
  return (
    <div>
      <H2>{categoryName}</H2>
      {categoryTodos.length > 0 ? (
        <Todos className="mt-5 flex flex-col gap-2">
          {categoryTodos.map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </Todos>
      ) : (
        <P className="mt-3">There are no todos in this category.</P>
      )}
    </div>
  );
}
