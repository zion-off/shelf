import { auth } from "@/auth";
import { headers } from "next/headers";
import Hero from "@/components/landing/hero";

interface AuthCheckProps {
  children: React.ReactNode;
}

// Routes that don't require authentication
const PUBLIC_ROUTES = ["/share"];

export default async function AuthCheck({ children }: AuthCheckProps) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "/";

  // Allow public routes without authentication
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  if (isPublicRoute) {
    return <>{children}</>;
  }

  const session = await auth();
  if (session?.user) {
    return <>{children}</>;
  } else {
    return <Hero />;
  }
}
