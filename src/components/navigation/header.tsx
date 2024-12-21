import { auth, signIn } from "@/auth";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  // what a visitor sees
  if (!user) {
    return (
      <header className="w-full flex justify-around p-4 bg-slate-600">
        <div>
            Logo
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          >
            Sign in
          </button>
        </form>
      </header>
    );
  }

  // what an authenticated user sees
  return <div>test</div>;
}
