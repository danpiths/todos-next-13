export const runtime = "edge";

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../../components/Footer";
import { Toaster } from "@/ui/toaster";
import { getCurrentScheme } from "@/utils/colorScheme";
import { Metadata } from "next";
import { env } from "@/env.mjs";

const inter = Inter({ subsets: ["latin"], display: "auto" });

export const metadata: Metadata = {
  title: "Todos App",
  description: "Track your todos w/ descriptions and categorization",
  openGraph: {
    title: "Todos App by danpiths",
    description: "Track your todos w/ descriptions and categorization",
  },
  metadataBase: new URL(env.NEXT_PUBLIC_APP_BASE_URL),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const scheme = await getCurrentScheme();

  return (
    <html lang="en" className={scheme === "dark" ? "dark" : ""}>
      <ClerkProvider>
        <body
          className={`flex min-h-[100svh] w-full flex-col ${inter.className}`}
        >
          <Header />
          <div className="flex w-full flex-1 flex-col px-5 lg:mx-auto lg:max-w-5xl">
            {children}
          </div>
          <Footer />
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
