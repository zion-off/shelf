'use client';

import { useEffect } from 'react';
import { IFolder } from '@/interfaces';
import { SidebarMenuItem, SidebarMenuSub, useSidebar } from '@/components/ui/sidebar';
import { FolderSection } from '@/components/sidebar/folderSection';
import { FolderItem } from '@/components/sidebar/folderItem';

interface FolderListClientProps {
  folders: IFolder[];
  defaultFolder: string | null;
}

export function FolderListClient({ folders, defaultFolder }: FolderListClientProps) {
  const { hydrateFolders } = useSidebar();
  const publicFolders = folders.filter((f) => f.isPublic);
  const privateFolders = folders.filter((f) => !f.isPublic);

  // Hydrate the sidebar with folders on mount
  useEffect(() => {
    hydrateFolders(folders, defaultFolder);
  }, [folders, defaultFolder, hydrateFolders]);

  return (
    <>
      <FolderSection title="Public" folders={publicFolders} />
      <FolderSection title="Private" folders={privateFolders} />
      <SidebarMenuItem className="cursor-pointer">
        <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
          <FolderItem folder={null} />
        </SidebarMenuSub>
      </SidebarMenuItem>
    </>
  );
}
