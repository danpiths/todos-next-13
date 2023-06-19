import { UserTodos } from "@/app/api/(todos)/getUserTodos/route";
import Todo from "../Todos/Todo";
import Todos from "../Todos/Todos";
import { H2, P } from "@/ui/typography";
import { Collapsible, CollapsibleTrigger } from "@/ui/collapsible";
import { Plus } from "lucide-react";

export default function Category({
  categoryName,
  categoryTodos,
}: {
  categoryName: string;
  categoryTodos: UserTodos["data"];
}) {
  return (
    <Collapsible className="border-b pb-2">
      <CollapsibleTrigger
        className="flex w-full cursor-pointer items-center justify-between transition-all hover:underline disabled:cursor-default disabled:select-text disabled:hover:no-underline [&[data-state=open]>svg]:rotate-[135deg]"
        disabled={categoryTodos.length === 0}
      >
        <H2 className="border-b-0">{categoryName}</H2>
        {categoryTodos.length > 0 && (
          <Plus className="h-5 w-5 transition-transform duration-200" />
        )}
      </CollapsibleTrigger>
      {categoryTodos.length > 0 ? (
        <Todos className="flex flex-col gap-2">
          {categoryTodos.map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </Todos>
      ) : (
        <P>There are no todos in this category.</P>
      )}
    </Collapsible>
  );
}
