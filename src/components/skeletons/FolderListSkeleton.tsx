import { SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar';
import { FolderSkeleton } from './FolderSkeleton';

export function FolderListSkeleton() {
  return (
    <>
      {/* Public section */}
      <SidebarMenuItem>
        <p className="p-2 px-3.5 text-sm cursor-default">Public</p>
        <SidebarMenuSub className="ml-0 border-l-0 pl-4 px-1.5">
          <FolderSkeleton />
          <FolderSkeleton />
        </SidebarMenuSub>
      </SidebarMenuItem>

      {/* Private section */}
      <SidebarMenuItem>
        <p className="p-2 px-3.5 text-sm cursor-default">Private</p>
        <SidebarMenuSub className="ml-0 border-l-0 pl-4 px-1.5">
          <FolderSkeleton />
          <FolderSkeleton />
        </SidebarMenuSub>
      </SidebarMenuItem>

      {/* Ungrouped */}
      <SidebarMenuItem className="cursor-pointer">
        <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
          <FolderSkeleton />
        </SidebarMenuSub>
      </SidebarMenuItem>
    </>
  );
}
