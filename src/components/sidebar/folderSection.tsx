import { SidebarMenuItem, SidebarMenuSub } from '@/components/ui/sidebar';
import { FolderItem } from '@/components/sidebar/folderItem';
import { IFolder } from '@/interfaces';

interface FolderSectionProps {
  title: string;
  folders: IFolder[];
  filter: (folder: IFolder) => boolean;
  currentFolder: IFolder | null;
  favoriteFolder: string | null;
  onFolderClick: (folder: IFolder | null) => void;
  onFavoriteClick: (folderId: string | null) => void;
}

export function FolderSection({
  title,
  folders,
  filter,
  currentFolder,
  favoriteFolder,
  onFolderClick,
  onFavoriteClick
}: FolderSectionProps) {
  return (
    <SidebarMenuItem>
      <p className="p-2 text-sm cursor-default">{title}</p>
      {folders.length ? (
        <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
          {folders.filter(filter).map((folder) => (
            <FolderItem
              key={folder.name}
              folder={folder}
              isActive={currentFolder?._id === folder._id}
              isFavorite={folder._id.toString() === favoriteFolder}
              onFolderClick={() => onFolderClick(folder)}
              onFavoriteClick={() => onFavoriteClick(folder._id.toString())}
            />
          ))}
        </SidebarMenuSub>
      ) : null}
    </SidebarMenuItem>
  );
}
