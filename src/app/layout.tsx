import type { Metadata } from "next";
import "./globals.css";

// components
import AuthCheck from "@/auth/authCheck";
import Header from "@/components/navigation/header";

export const metadata: Metadata = {
  title: "Title",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex flex-col font-switzer">
        <Header />
        <AuthCheck>{children}</AuthCheck>
      </body>
    </html>
  );
}
