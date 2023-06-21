export const runtime = "edge";

import TodoSignIn from "@/components/Auth/TodoSignIn";

export default async function Page() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <TodoSignIn />
    </div>
  );
}
