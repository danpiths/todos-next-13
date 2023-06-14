import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { H1, H2 } from "@/ui/typography";

export default function AuthedHomeLoading() {
  return (
    <div className="flex flex-1 flex-col">
      <H1>
        Your <span className="underline underline-offset-4">Todos</span>
      </H1>
      <Skeleton className="mt-5 h-10 w-[6.6rem]" />
      <H2 className="mt-5">Default</H2>
      <Skeleton className="mt-5 h-40" />
      <Skeleton className="mt-2 h-40" />
      <Skeleton className="mt-2 h-40" />
      <Skeleton className="mt-2 h-40" />
    </div>
  );
}
