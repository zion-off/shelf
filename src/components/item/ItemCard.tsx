'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { IItem } from '@/interfaces/models';
import { noise } from '@/utils';

interface ItemCardProps {
  item: IItem;
  folderId: string;
  isSharePage?: boolean;
}

export const ItemCard = memo(function ItemCard({ item, folderId, isSharePage = false }: ItemCardProps) {
  const { title, author, thumbnail, placeholderCover } = item;
  const basePath = isSharePage ? `/share/${folderId}` : `/folder/${folderId}`;

  return (
    <Link href={`${basePath}?item=${item._id}`} className="block" scroll={false}>
      <div className="flex flex-col rounded-md overflow-hidden shadow-md cursor-pointer">
        <div className="w-full h-24">
          {thumbnail ? (
            <Image
              src={thumbnail || '/placeholder.svg'}
              alt={title}
              width={400}
              height={300}
              className="w-full h-full object-cover"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
                `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="100%" height="100%" fill="#${placeholderCover}"/>
    </svg>
  `
              ).toString('base64')}`}
            />
          ) : (
            <div style={{ ...noise }} className={`bg-[#${placeholderCover}] w-full h-full bg-noise`} />
          )}
        </div>
        <div className="grow flex flex-col p-2 text-z-background bg-z-background-secondary text-xs">
          <h3 className="text-z-foreground truncate">{title}</h3>
          <p className="text-z-foreground-secondary">{author}</p>
        </div>
      </div>
    </Link>
  );
});
