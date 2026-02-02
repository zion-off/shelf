import { Suspense } from 'react';
import { slugToFolderId } from '@/lib/folderUtils';
import { getItemsInFolder } from '@/actions/item/getItemsInFolder';
import { ItemsGrid } from '@/components/item/ItemsGrid';
import { ItemGridSkeleton } from '@/components/skeletons/ItemGridSkeleton';
import { ItemsHydrator } from '@/components/item/ItemsHydrator';
import { ItemDrawer } from '@/components/item/ItemDrawer';

interface FolderPageProps {
  params: Promise<{ folderId: string }>;
}

async function FolderContent({ folderId }: { folderId: string }) {
  const folderIdValue = slugToFolderId(folderId);
  const items = await getItemsInFolder({ folderID: folderIdValue });

  return (
    <>
      <ItemsHydrator items={items} />
      <ItemsGrid items={items} folderId={folderId} />
      <ItemDrawer />
    </>
  );
}

export default async function FolderPage({ params }: FolderPageProps) {
  const { folderId } = await params;

  return (
    <Suspense fallback={<ItemGridSkeleton />}>
      <FolderContent folderId={folderId} />
    </Suspense>
  );
}
