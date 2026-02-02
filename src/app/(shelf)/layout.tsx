import { Suspense } from 'react';
import Header from '@/components/navigation/header';
import ShelfHeader from '@/components/shelf/shelfHeader';
import { AppSidebar } from '@/components/sidebar/appSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { HomeProvider } from '@/context/homeContext';
import { FolderListSkeleton } from '@/components/skeletons/FolderListSkeleton';
import { FolderListServer } from '@/components/sidebar/FolderListServer';

interface ShelfLayoutProps {
  children: React.ReactNode;
}

export default function ShelfLayout({ children }: ShelfLayoutProps) {
  return (
    <main className="flex flex-col h-[100dvh] overflow-hidden">
      <Header />
      <div className="flex-1 w-full flex px-4 relative overflow-hidden">
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
                <FolderListServer />
              </Suspense>
            </AppSidebar>
            <SidebarInset className="max-h-full flex flex-col pt-1">
              <ShelfHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </HomeProvider>
      </div>
    </main>
  );
}
