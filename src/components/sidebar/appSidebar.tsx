"use client";

import * as React from "react";
import { Book } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import AddFolderDialog from "../shelf/addFolderDialog";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { folderState } = useSidebar();

  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex justify-between group/item">
                <div className="flex items-center gap-2">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Book className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Folders</span>
                  </div>
                </div>
                <div className="opacity-0 group-hover/item:opacity-100 transition-opacity duration-50 fade-in-50 fade-out-50">
                  <AddFolderDialog />
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={"/"} className="font-medium">
                  Public
                </a>
              </SidebarMenuButton>
              {folderState?.length ? (
                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                  {folderState.map((folder) => (
                    <SidebarMenuSubItem key={folder.name}>
                      <SidebarMenuSubButton asChild>
                        <a href="/">{folder.name}</a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
