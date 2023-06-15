export const runtime = "edge";

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "../../components/Footer";
import { Toaster } from "@/ui/toaster";

const inter = Inter({ subsets: ["latin"], display: "auto" });

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
    <html lang="en" className="dark">
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
