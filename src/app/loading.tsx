import NotSignedInHome from "@/components/home/NotSignedInHome";
import AuthedHomeLoading from "@/components/home/loading/AuthedHomeLoading";
import { auth } from "@clerk/nextjs";

export default function Loading() {
  const { userId } = auth();

  return (
    <main className="flex flex-1 flex-col">
      {userId ? <AuthedHomeLoading /> : <NotSignedInHome />}
    </main>
  );
}
