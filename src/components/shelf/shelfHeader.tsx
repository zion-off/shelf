import { Input } from "../ui/input";
import AddItemDialog from "./addItemDialog";

export default function ShelfHeader() {
  return (
    <nav className="h-fit w-full flex justify-between gap-2 items-center">
      <Input className="bg-neutral-100 md:hover:border-neutral-300 dark:bg-neutral-900 h-10 dark:md:hover:border-neutral-500" placeholder="Search" />
      <AddItemDialog />
    </nav>
  );
}
