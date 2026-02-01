'use client';

import { IFolder } from '@/interfaces';
import { SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar';
import { FolderProvider } from '@/context/folderContext';
import { FolderSection } from '@/components/sidebar/folderSection';
import { FolderItem } from '@/components/sidebar/folderItem';

interface FolderListClientProps {
  folders: IFolder[];
  defaultFolder: string | null;
}

export function FolderListClient({ folders, defaultFolder }: FolderListClientProps) {
  const publicFolders = folders.filter((f) => f.isPublic);
  const privateFolders = folders.filter((f) => !f.isPublic);

  return (
    <FolderProvider defaultFolder={defaultFolder}>
      <FolderSection title="Public" folders={publicFolders} />
      <FolderSection title="Private" folders={privateFolders} />
      <SidebarMenuItem className="cursor-pointer">
        <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
          <FolderItem folder={null} />
        </SidebarMenuSub>
      </SidebarMenuItem>
    </FolderProvider>
  );
}
