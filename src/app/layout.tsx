import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AuthCheck from "@/auth/authCheck";

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
      <body className="font-switzer bg-z-background text-z-foreground" >
        <AuthCheck>
          {children}
          <Toaster />
        </AuthCheck>
      </body>
    </html>
  );
}
