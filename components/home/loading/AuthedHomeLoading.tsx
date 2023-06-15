import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import { H1, H2 } from "@/ui/typography";

export default function AuthedHomeLoading() {
  return (
    <div className="mt-5 flex flex-1 flex-col">
      <H1>
        Your <span className="underline underline-offset-4">Todos</span>
      </H1>
      <div className="lg:flex lg:gap-10">
        <Skeleton className="mt-5 h-10 w-[6.6rem] lg:sticky lg:top-24 lg:mt-7 lg:h-[26rem] lg:w-[29rem]" />
        <div className="mt-5 lg:flex-1">
          <H2>Default</H2>
          <Skeleton className="mt-5 h-40" />
          <Skeleton className="mt-2 h-40" />
          <Skeleton className="mt-2 h-40" />
        </div>
      </div>
    </div>
  );
}
