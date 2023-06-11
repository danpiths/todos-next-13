export const runtime = "edge";

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todos App",
  description: "Track your todos w/ descriptions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`flex min-h-[100svh] w-full flex-col ${inter.className}`}
        >
          <Header />
          <div className="flex flex-1 flex-col px-5">{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
