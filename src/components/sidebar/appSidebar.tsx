'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  useSidebar
} from '@/components/ui/sidebar';
import { FolderItem } from '@/components/sidebar/folderItem';
import { FolderSection } from '@/components/sidebar/folderSection';
import { AppSidebarHeader } from '@/components/sidebar/sidebarHeader';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { folderState } = useSidebar();

  return (
    <Sidebar variant="floating" {...props}>
      <AppSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {folderState?.length && (
              <SidebarMenuItem className="cursor-pointer">
                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                  <FolderItem folder={null} />
                </SidebarMenuSub>
              </SidebarMenuItem>
            )}
            <FolderSection title="Public" filter={(folder) => folder.isPublic === true} />
            <FolderSection title="Private" filter={(folder) => folder.isPublic === false} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
