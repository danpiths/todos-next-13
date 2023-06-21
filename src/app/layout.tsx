export const runtime = "edge";

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../../components/Footer";
import { Toaster } from "@/ui/toaster";
import { getCurrentScheme } from "@/utils/colorScheme";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], display: "auto" });

export const metadata: Metadata = {
  title: "Todos App",
  description: "Track your todos w/ descriptions and categorization",
  openGraph: {
    title: "Todos App by danpiths",
    description: "Track your todos w/ descriptions and categorization",
  }
};

export default async function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
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
            {authModal}
            {children}
          </div>
          <Footer />
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
