'use client';

import { SidebarMenuItem, SidebarMenuSub, useSidebar } from '@/components/ui/sidebar';
import { FolderItem } from '@/components/sidebar/folderItem';
import { IFolder } from '@/interfaces';

interface FolderSectionProps {
  title: string;
  filter: (folder: IFolder) => boolean;
}

export function FolderSection({ title, filter }: FolderSectionProps) {
  const { folderState } = useSidebar();
  return (
    <SidebarMenuItem>
      <p className="p-2 px-3.5 text-sm cursor-default">{title}</p>
      {(folderState ?? []).length ? (
        <SidebarMenuSub className="ml-0 border-l-0 pl-4 px-1.5">
          {(folderState ?? []).filter(filter).map((folder) => (
            <FolderItem key={folder.name} folder={folder} />
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}
