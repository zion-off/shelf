'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar';
import { FolderItem } from '@/components/sidebar/folderItem';
import { IFolder } from '@/interfaces';

interface FolderSectionProps {
  title: string;
  folders: IFolder[];
}

export function FolderSection({ title, folders }: FolderSectionProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarMenuItem>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-1.5 w-full px-2 py-1.5 group/section cursor-default"
      >
        <ChevronRight
          className={`size-3 text-sidebar-foreground/30 group-hover/section:text-sidebar-foreground/50 transition-transform duration-200 ${collapsed ? '' : 'rotate-90'}`}
        />
        <span className="text-xs font-medium tracking-widest uppercase text-sidebar-foreground/40 group-hover/section:text-sidebar-foreground/70 transition-colors duration-150">
          {title}
        </span>
        {folders.length > 0 && (
          <span className="ml-auto mr-4 text-xs text-sidebar-foreground/30 tabular-nums">{folders.length}</span>
        )}
      </button>
      {!collapsed && (
        <>
          {folders.length > 0 && (
            <SidebarMenuSub className="ml-0 border-l-0 pl-4 px-1.5">
              {folders.map((folder) => (
                <FolderItem key={folder._id.toString()} folder={folder} />
              ))}
            </SidebarMenuSub>
          )}
        </>
      )}
    </SidebarMenuItem>
  );
}
