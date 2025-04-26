import { SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { FavoriteStar } from './favoriteStar';
import { IFolder } from '@/interfaces';

interface FolderItemContentsProps {
  folder: IFolder | null;
  isActive: boolean;
  isFavorite: boolean;
  onClick: () => void;
  onFavoriteClick: (e: React.MouseEvent) => void;
}

export const FolderItemContents = ({
  folder,
  isActive,
  isFavorite,
  onClick,
  onFavoriteClick
}: FolderItemContentsProps) => (
  <SidebarMenuSubItem onClick={onClick} className="group/fav">
    <SidebarMenuSubButton asChild {...(isActive ? { isActive: true } : {})}>
      <div className="flex justify-between cursor-pointer">
        <p>{folder?.name ?? 'Ungrouped'}</p>
        <FavoriteStar isFavorite={isFavorite} onClick={onFavoriteClick} />
      </div>
    </SidebarMenuSubButton>
  </SidebarMenuSubItem>
);
