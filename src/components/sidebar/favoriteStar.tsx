import * as React from 'react';
import { Star } from 'lucide-react';

interface FavoriteStarProps {
  isFavorite: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function FavoriteStar({ isFavorite, onClick }: FavoriteStarProps) {
  return (
    <Star
      className={
        isFavorite
          ? 'fill-yellow-400 stroke-yellow-400 hover:bg-neutral-200 dark:hover:bg-neutral-900 aspect-square rounded-md cursor-pointer p-1 transition-colors duration-50 fade-in-50 fade-out-50'
          : 'opacity-0 group-hover/fav:opacity-100 transition-colors duration-50 fade-in-50 fade-out-50 fill-neutral-300 stroke-neutral-300 dark:fill-neutral-600 dark:stroke-neutral-600 hover:bg-neutral-200 dark:hover:bg-neutral-900 aspect-square rounded-md cursor-pointer p-1 duration-50'
      }
      onClick={onClick}
    />
  );
}
