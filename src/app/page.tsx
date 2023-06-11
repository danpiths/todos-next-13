export const runtime = "edge";

import AuthedHome from "@/components/home/AuthedHome";
import NotSignedInHome from "@/components/home/NotSignedInHome";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();

  return (
    <main className="flex flex-1 flex-col">
      {userId ? <AuthedHome /> : <NotSignedInHome />}
    </main>
  );
}
