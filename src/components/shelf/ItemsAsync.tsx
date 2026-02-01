import { auth } from '@/auth';
import { getDefaultFolder } from '@/actions/folder/getDefaultFolder';
import { getItemsInFolder } from '@/actions/item/getItemsInFolder';
import { ItemsClient } from './ItemsClient';

export default async function ItemsAsync() {
  const session = await auth();
  const dbID = session?.user?.id as string;

  const defaultFolder = await getDefaultFolder({ dbID });
  const items = await getItemsInFolder({ folderID: defaultFolder });

  return <ItemsClient initialItems={items} />;
}
