import { Suspense } from 'react';
import ShelfHeader from '@/components/shelf/shelfHeader';
import { AppSidebar } from '@/components/sidebar/appSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { HomeProvider } from '@/context/homeContext';
import FolderListAsync from './FolderListAsync';
import ItemsAsync from './ItemsAsync';
import { FolderListSkeleton } from '@/components/skeletons/FolderListSkeleton';
import { ItemGridSkeleton } from '@/components/skeletons/ItemGridSkeleton';

export default function Shelf() {
  return (
    <HomeProvider>
      <SidebarProvider
        style={
          {
            '--sidebar-width': '19rem',
            height: '100%'
          } as React.CSSProperties
        }
      >
        <AppSidebar className="absolute inset-0 h-full pt-1">
          <Suspense fallback={<FolderListSkeleton />}>
            <FolderListAsync />
          </Suspense>
        </AppSidebar>
        <SidebarInset className="max-h-full flex flex-col pt-1">
          <ShelfHeader />
          <Suspense fallback={<ItemGridSkeleton />}>
            <ItemsAsync />
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </HomeProvider>
  );
}
