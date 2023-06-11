import { Button } from "@/ui/button";
import { H1, P } from "@/ui/typography";
import Link from "next/link";

export default function NotSignedInHome() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-4">
      <H1>
        Welcome to the{" "}
        <span className="underline underline-offset-4">Todos</span> App
      </H1>
      <P>
        This is a simple todo app that has the option for descriptions as well
        <br /> <span className="italic">Sign In/Register</span> to start using
        the app (click either of the buttons below)
      </P>
      <div className="flex items-center gap-3">
        <Button asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild variant={"secondary"}>
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </div>
  );
}
