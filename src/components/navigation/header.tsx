import { auth, signIn } from "@/auth";

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  const name = user?.name;

  // what a visitor sees
  if (!user) {
    return (
      <header className="w-full p-4 z-50 text-z-foreground">
        <div className="flex justify-between items-center p-2 border-t-z-component border-t-4 sticky top-0">
          <div className="text-xl font-gambarino">PaperShelf</div>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="font-switzer flex items-center gap-2 underline-fade "
            >
              Sign in
            </button>
          </form>
        </div>
      </header>
    );
  }

  // what an authenticated user sees
  return (
    <header className="w-full p-4 z-50 text-z-foreground">
      <div className="flex justify-between items-center p-2 border-t-z-component border-t-4 sticky top-0">
        <div className="text-xl font-gambarino">PaperShelf</div>
        <button
          type="submit"
          className="font-switzer flex items-center gap-2 underline-fade "
        >
          {name}
        </button>
      </div>
    </header>
  );
}
