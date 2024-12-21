import { auth } from "@/auth";
import Hero from "@/components/landing/hero";

interface AuthCheckProps {
  children: React.ReactNode;
}

export default async function AuthCheck({ children }: AuthCheckProps) {
  const session = await auth();
  if (session?.user) {
    return <>{children}</>;
  } else {
    return <Hero />;
  }
}
