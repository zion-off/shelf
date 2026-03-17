import { BookOpen } from 'lucide-react';
import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import AddFolderDialog from '@/components/shelf/addFolderDialog';

export function AppSidebarHeader() {
  return (
    <SidebarHeader className="border-b border-sidebar-border pb-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <div className="flex justify-between items-center group/item px-1">
              <div className="flex items-center gap-2.5">
                <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-amber-50 dark:bg-neutral-800 border border-amber-100 dark:border-neutral-700">
                  <BookOpen className="size-4 stroke-[1.5px]" style={{ color: 'var(--z-component)' }} />
                </div>
                <span className="font-semibold tracking-tight" style={{ fontFamily: 'Switzer-Regular, sans-serif' }}>
                  Folders
                </span>
              </div>
              <div className="md:opacity-0 group-hover/item:opacity-100 transition-opacity duration-150">
                <AddFolderDialog />
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
