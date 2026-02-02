import { Skeleton } from '@/components/ui/skeleton';
import { SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';

export function FolderSkeleton() {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
        </div>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
