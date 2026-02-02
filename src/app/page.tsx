import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getDefaultFolder } from '@/actions/folder/getDefaultFolder';
import { folderIdToSlug } from '@/lib/folderUtils';

export default async function Home() {
  const session = await auth();

  if (!session?.user?.id) {
    // If not authenticated, redirect will be handled by AuthCheck in layout
    return null;
  }

  const defaultFolder = await getDefaultFolder({ dbID: session.user.id });
  redirect(`/folder/${folderIdToSlug(defaultFolder)}`);
}

