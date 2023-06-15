export const runtime = "edge";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <SignIn
        appearance={{
          baseTheme: dark,
          elements: { rootBox: "w-full lg:w-80", card: "w-full lg:w-80" },
          layout: {
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            borderRadius: "7px",
            colorPrimary: "#F8FAFC",
          },
        }}
        afterSignUpUrl="/api/connectUserToDatabase"
      />
    </div>
  );
}
