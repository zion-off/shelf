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
          ? 'fill-yellow-400 stroke-yellow-400'
          : 'opacity-0 group-hover/fav:opacity-100 transition-opacity duration-50 fade-in-50 fade-out-50 fill-neutral-300 stroke-neutral-300 dark:fill-neutral-600 dark:stroke-neutral-600'
      }
      onClick={onClick}
    />
  );
}