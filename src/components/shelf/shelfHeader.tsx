import AddItemDialog from '@/components/shelf/addItemDialog';
import SearchBar from '@/components/search/searchBar';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function ShelfHeader() {
  return (
    <nav className="h-fit w-full flex justify-between gap-1 items-center">
      <SidebarTrigger className="-ml-1 mr-2" />
      <Separator orientation="vertical" className="mr-2 h-8" />
      <SearchBar />
      <Separator orientation="vertical" className="mr-2 h-8" />
      <AddItemDialog />
    </nav>
  );
}
