import { auth, signIn, signOut } from '@/auth';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';
import { headers } from 'next/headers';

export default async function Header() {
  const session = await auth();
  const user = session?.user;
  const name = user?.name;
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '/';

  // what a visitor sees
  if (!user) {
    return (
      <header className="w-full p-4 z-50 text-z-foreground">
        <div className="flex justify-between items-center p-2 border-t-z-component border-t-4 sticky top-0">
          <div className="text-xl font-gambarino">Shelf</div>
          <form
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: '/' });
            }}
          >
            <button type="submit" className="font-switzer flex items-center gap-2 underline-fade ">
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
        <div className="text-xl font-gambarino">Shelf</div>
        <Popover>
          <PopoverTrigger className="font-switzer flex items-center gap-2 underline-fade ">{name}</PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-1">
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <button type="submit" className="w-fit text-left">
                  Sign out
                </button>
              </form>
              {pathname !== '/settings' && (
                <Link href="/settings" className="w-fit text-left">Settings</Link>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}
