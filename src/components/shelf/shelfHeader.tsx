import { Input } from "../ui/input";
import AddItemDialog from "./addItemDialog";
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function ShelfHeader() {
  return (
    <nav className="h-fit w-full flex justify-between gap-2 items-center">
      <SidebarTrigger className="-ml-1 mr-2" />
      <Separator orientation="vertical" className="mr-2 h-8" />
      <Input className="bg-neutral-100 dark:bg-neutral-900 h-10 md:hover:border-z-component" placeholder="Search" />
      <AddItemDialog />
    </nav>
  );
}
