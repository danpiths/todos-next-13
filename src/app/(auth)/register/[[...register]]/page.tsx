export const runtime = "edge";

import TodoSignUp from "@/components/Auth/TodoSignUp";

export default async function Page() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <TodoSignUp />
    </div>
  );
}
