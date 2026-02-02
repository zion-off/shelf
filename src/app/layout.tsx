import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import AuthCheck from "@/auth/authCheck";

export const metadata: Metadata = {
  title: "shelf",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Shelf",
  },
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#161413",
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
