import { getCurrentScheme } from "@/utils/colorScheme";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default async function TodoSignUp() {
  const scheme = await getCurrentScheme();

  return (
    <SignUp
      appearance={{
        baseTheme: scheme === "dark" ? dark : undefined,
        elements: { rootBox: "w-full lg:w-80", card: "w-full lg:w-80" },
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
        },
        variables: {
          borderRadius: "7px",
          colorPrimary: scheme === "dark" ? "#EED4CD" : "#1F1A19",
          colorText: scheme === "dark" ? "#EED4CD" : "#1F1A19",
          colorBackground: scheme === "dark" ? "#080808" : "#F2F2F2",
        },
      }}
    />
  );
}
