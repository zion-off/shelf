import { notFound } from 'next/navigation';
import { getPublicFolder } from '@/actions/folder/getPublicFolder';
import { getPublicFolderItems } from '@/actions/item/getPublicFolderItems';
import { HomeProvider } from '@/context/homeContext';
import { ItemsGrid } from '@/components/item/ItemsGrid';
import { ShareItemDrawer } from '@/components/share/ShareItemDrawer';

interface SharePageProps {
  params: Promise<{ folderId: string }>;
}

export default async function SharePage({ params }: SharePageProps) {
  const { folderId } = await params;

  const folder = await getPublicFolder({ folderId });

  if (!folder) {
    notFound();
  }

  const items = await getPublicFolderItems({ folderId });

  return (
    <main className="min-h-screen bg-z-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-baseline gap-2">
            <h1 className="text-2xl font-semibold text-z-foreground">{folder.name}</h1>
            {typeof folder.owner === 'object' && 'name' in folder.owner && (
              <span className="text-muted-foreground text-sm lowercase">{folder.owner.name}</span>
            )}
          </div>
          <p className="text-z-foreground-secondary mt-1">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </header>

        <HomeProvider initialItems={items}>
          <ItemsGrid items={items} folderId={folderId} isSharePage />
          <ShareItemDrawer folderId={folderId} />
        </HomeProvider>
      </div>
    </main>
  );
}
