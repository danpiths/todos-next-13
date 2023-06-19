import { auth, UserButton } from "@clerk/nextjs";
import { Button } from "@/ui/button";
import Link from "next/link";
import { dark } from "@clerk/themes";
import ColorSchemeButton from "./ui/color-scheme-button";
import { getCurrentScheme } from "@/utils/colorScheme";

export default async function Header() {
  const { userId } = auth();
  const scheme = await getCurrentScheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex w-full items-center justify-between px-5 py-3 lg:mx-auto lg:max-w-5xl">
        <Button asChild variant={"link"} className="px-0">
          <Link href="/">Todos App</Link>
        </Button>
        <div className="flex items-center gap-3">
          {userId ? (
            <UserButton
              appearance={{
                baseTheme: scheme === "dark" ? dark : undefined,
                userProfile: {
                  baseTheme: scheme === "dark" ? dark : undefined,
                  variables: {
                    borderRadius: "7px",
                    colorPrimary: "#F8FAFC",
                  },
                },
                variables: {
                  borderRadius: "7px",
                  colorPrimary: scheme === "dark" ? "#EED4CD" : "#1F1A19",
                  colorText: scheme === "dark" ? "#EED4CD" : "#1F1A19",
                  colorBackground: scheme === "dark" ? "#080808" : "#F2F2F2",
                },
              }}
              afterSignOutUrl="/"
            />
          ) : (
            <Button size={"sm"} asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
          <ColorSchemeButton />
        </div>
      </div>
    </header>
  );
}
