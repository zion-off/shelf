'use client';

import { useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion } from 'motion/react';
import { noise } from '@/utils';
import { Input } from '@/components/ui/input';
import { searchItems } from '@/actions/search/searchItems';
import { getItemsInFolder } from '@/actions/item';
import { useHomeContext } from '@/context/homeContext';
import { useSidebar } from '@/components/ui/sidebar';
import { IItem } from '@/interfaces';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searching, setSearching] = useState<boolean>(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
  const [searchResults, setSearchResults] = useState<IItem[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);
  const { handleDrawerOpenChange, handleSelectedItemChange, updateAllItems, setLoadingItems } = useHomeContext();
  const { openFolderByID } = useSidebar();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      searchItems(debouncedSearchTerm).then((res) => {
        const items = JSON.parse(res);
        setSearchResults(items);
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    let element = document.getElementById('search-portal');
    if (!element) {
      element = document.createElement('div');
      element.id = 'search-portal';
      document.body.appendChild(element);
    }
    setPortalElement(element);

    return () => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, []);

  const handleFocus = () => {
    setSearching(true);
  };

  const handleBlur = () => {
    if (!searchTerm) {
      setSearching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setSearching(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const listItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Input
        className="bg-neutral-100 dark:bg-neutral-900 h-10 md:hover:border-z-component mr-2"
        placeholder="Search"
        onFocus={handleFocus}
        value={searchTerm}
        onChange={handleChange}
      />

      {searching &&
        portalElement &&
        createPortal(
          <motion.div
            className="fixed inset-0 w-full h-full bg-neutral-100 dark:bg-neutral-900 z-50 px-5 md:px-20 pt-10"
            initial={{ opacity: 0, filter: 'blur(12px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 pb-0 h-full flex flex-col">
              <Input
                className="bg-neutral-100 dark:bg-neutral-900 h-10"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
                autoFocus
                onBlur={handleBlur}
              />
              <motion.ul
                initial="hidden"
                animate="show"
                variants={container}
                className="flex flex-col mt-4 w-full gap-2 h-full overflow-scroll scroll-smooth"
              >
                {searchResults.length > 0 ? (
                  searchResults.map((article) => (
                    <motion.li
                      key={article._id.toString()}
                      variants={listItem}
                      className="last:pb-20"
                      onClick={async () => {
                        setSearchTerm('');
                        setSearchResults([]);
                        openFolderByID(article.in_folder);
                        handleSelectedItemChange(article);
                        setSearching(false);
                        handleDrawerOpenChange(true);
                        setLoadingItems(true);
                        const items = await getItemsInFolder({
                          folderID: article.in_folder ? article.in_folder.toString() : null
                        });
                        updateAllItems(items);
                      }}
                    >
                      <SearchItem item={article} />
                    </motion.li>
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center pb-32">
                    <p className="text-center text-secondary">No results found</p>
                  </div>
                )}
              </motion.ul>
            </div>
          </motion.div>,
          portalElement
        )}
    </>
  );
}

const SearchItem = memo(function SearchItem({ item }: { item: IItem }) {
  const { title, author, placeholderCover, thumbnail } = item;
  const cover = thumbnail ? (
    <Image
      src={thumbnail}
      alt={title}
      width={400}
      height={300}
      className="w-full h-[150px] object-cover rounded-md"
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
    <div style={{ ...noise }} className={`bg-[#${placeholderCover}] w-full bg-noise rounded-md h-[150px]`} />
  );

  return (
    <div className="grid grid-cols-5 p-4 bg-z-component-border w-full rounded-md gap-4">
      <div className="col-span-1">{cover}</div>
      <div className="col-span-4 flex flex-col p-2 text-z-background">
        <h3 className="text-z-foreground truncate">{title}</h3>
        <p className="text-z-foreground-secondary">{author}</p>
      </div>
    </div>
  );
});
