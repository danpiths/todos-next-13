import { auth, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "@/ui/button";
import Link from "next/link";
import { dark } from "@clerk/themes";

export default function Header() {
  const { userId } = auth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex w-full items-center justify-between px-5 py-3 lg:mx-auto lg:max-w-5xl">
        <Button asChild variant={"link"} className="px-0">
          <Link href="/">Todos App</Link>
        </Button>
        {userId ? (
          <UserButton
            appearance={{
              baseTheme: dark,
              userProfile: {
                baseTheme: dark,
                variables: {
                  borderRadius: "7px",
                  colorPrimary: "#F8FAFC",
                },
              },
              variables: {
                borderRadius: "7px",
                colorPrimary: "#F8FAFC",
                colorText: "#E6E6E6",
                colorBackground: "#101014",
              },
            }}
            afterSignOutUrl="/"
          />
        ) : (
          <Button size={"sm"} asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
