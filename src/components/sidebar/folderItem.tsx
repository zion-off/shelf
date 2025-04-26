import { SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { FavoriteStar } from './favoriteStar';
import { IFolder } from '@/interfaces';

interface FolderItemProps {
  folder: IFolder | null;
  isActive: boolean;
  isFavorite: boolean;
  onFolderClick: () => void;
  onFavoriteClick: (e: React.MouseEvent) => void;
}

export function FolderItem({ folder, isActive, isFavorite, onFolderClick, onFavoriteClick }: FolderItemProps) {
  return (
    <SidebarMenuSubItem onClick={onFolderClick} className="group/fav">
      <SidebarMenuSubButton asChild {...(isActive ? { isActive: true } : {})}>
        <div className="flex justify-between cursor-pointer">
          <p>{folder?.name ?? 'Ungrouped'}</p>
          <FavoriteStar
            isFavorite={isFavorite}
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick(e);
            }}
          />
        </div>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
