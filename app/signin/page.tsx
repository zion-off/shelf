import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
export default async function SignIn() {
  const session = await auth();
  const user = session?.user;
  return user ? (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Signout</button>
    </form>
  ) : (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  );
}
