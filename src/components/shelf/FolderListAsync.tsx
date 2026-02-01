import { auth } from '@/auth';
import { getAllFolders } from '@/actions/folder/getAllFolders';
import { getDefaultFolder } from '@/actions/folder/getDefaultFolder';
import { FolderListClient } from './FolderListClient';

export default async function FolderListAsync() {
  const session = await auth();
  const dbID = session?.user?.id as string;

  const [defaultFolder, folders] = await Promise.all([
    getDefaultFolder({ dbID }),
    getAllFolders({ dbID })
  ]);

  return <FolderListClient folders={folders} defaultFolder={defaultFolder} />;
}
