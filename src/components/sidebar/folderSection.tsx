'use client';

import { SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar';
import { FolderItem } from '@/components/sidebar/folderItem';
import { IFolder } from '@/interfaces';

interface FolderSectionProps {
  title: string;
  folders: IFolder[];
}

export function FolderSection({ title, folders }: FolderSectionProps) {
  return (
    <SidebarMenuItem>
      <p className="p-2 px-3.5 text-sm cursor-default">{title}</p>
      {folders.length > 0 && (
        <SidebarMenuSub className="ml-0 border-l-0 pl-4 px-1.5">
          {folders.map((folder) => (
            <FolderItem key={folder._id.toString()} folder={folder} />
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}
