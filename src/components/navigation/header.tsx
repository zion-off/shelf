import { auth, signIn } from "@/auth";

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  // what a visitor sees
  if (!user) {
    return (
      <header className="w-full p-4">
        <div className="flex justify-between p-2 border-t-component border-t-4 sticky top-0">
          <div className="text-lg font-gambarino">logo.</div>
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
        </div>
      </header>
    );
  }

  // what an authenticated user sees
  return <div>test</div>;
}
