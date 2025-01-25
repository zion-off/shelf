"use client";

import * as React from "react";
import { Book, Star } from "lucide-react";
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
import { IFolder } from "@/interfaces";
import { useHomeContext } from "@/context/homeContext";
import { getItemsInFolder } from "@/actions/item/getItemsInFolder";
import { updateDefaultFolder } from "@/actions/user/updateDefaultFolder";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { folderState, favoriteFolder, updateFavoriteFolder } = useSidebar();
  const { currentFolder, changeOpenFolder, updateAllItems } = useHomeContext();

  const handleFolderClick = async (changeToFolder: IFolder | null) => {
    changeOpenFolder(changeToFolder);
    const items = await getItemsInFolder({
      folderID: changeToFolder ? changeToFolder._id.toString() : null,
    });
    updateAllItems(items);
  };

  const handleFavoriteClick = async (newFolderID: string | null) => {
    updateFavoriteFolder(newFolderID);
    await updateDefaultFolder({ folderID: newFolderID });
  };

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
            <SidebarMenuItem className="cursor-pointer">
              {folderState?.length ? (
                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                  <SidebarMenuSubItem
                    onClick={() => handleFolderClick(null)}
                    className="group/fav"
                  >
                    <SidebarMenuSubButton
                      asChild
                      {...(currentFolder === null ? { isActive: true } : {})}
                    >
                      <div className="flex justify-between">
                        <p className="text-sm">Ungrouped</p>
                        {favoriteFolder === null ? (
                          <Star className="fill-yellow-400 stroke-yellow-400" />
                        ) : (
                          <Star
                            className="opacity-0 group-hover/fav:opacity-100 transition-opacity duration-50 fade-in-50 fade-out-50 fill-neutral-600 stroke-neutral-600"
                            onClick={() => handleFavoriteClick(null)}
                          />
                        )}
                      </div>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
            <SidebarMenuItem>
              <p className="p-2 text-sm cursor-default">Public</p>
              {folderState?.length ? (
                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                  {folderState
                    .filter((folder) => folder.isPublic === true)
                    .map((folder) => (
                      <SidebarMenuSubItem
                        key={folder.name}
                        onClick={() => handleFolderClick(folder)}
                        className="group/fav"
                      >
                        <SidebarMenuSubButton
                          asChild
                          {...(currentFolder?._id === folder._id
                            ? { isActive: true }
                            : {})}
                        >
                          <div className="flex justify-between cursor-pointer">
                            <p>{folder.name}</p>
                            {folder._id.toString() === favoriteFolder ? (
                              <Star
                                className="fill-yellow-400 stroke-yellow-400"
                                onClick={() => handleFavoriteClick(null)}
                              />
                            ) : (
                              <Star
                                className="opacity-0 group-hover/fav:opacity-100 transition-opacity duration-50 fade-in-50 fade-out-50 fill-neutral-600 stroke-neutral-600"
                                onClick={() =>
                                  handleFavoriteClick(folder._id.toString())
                                }
                              />
                            )}
                          </div>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
            <SidebarMenuItem>
              <p className="p-2 text-sm cursor-default">Private</p>
              {folderState?.length ? (
                <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                  {folderState
                    .filter((folder) => folder.isPublic === false)
                    .map((folder) => (
                      <SidebarMenuSubItem
                        key={folder.name}
                        onClick={() => handleFolderClick(folder)}
                        className="group/fav"
                      >
                        <SidebarMenuSubButton
                          asChild
                          {...(currentFolder?._id === folder._id
                            ? { isActive: true }
                            : {})}
                        >
                          <div className="flex justify-between cursor-pointer">
                            <p>{folder.name}</p>
                            {folder._id.toString() === favoriteFolder ? (
                              <Star
                                className="fill-yellow-400 stroke-yellow-400"
                                onClick={() => handleFavoriteClick(null)}
                              />
                            ) : (
                              <Star
                                className="opacity-0 group-hover/fav:opacity-100 transition-opacity duration-50 fade-in-50 fade-out-50 fill-neutral-600 stroke-neutral-600"
                                onClick={() =>
                                  handleFavoriteClick(folder._id.toString())
                                }
                              />
                            )}
                          </div>
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
