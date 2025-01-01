import AddItemDialog from "./addItemDialog";

export default function ShelfHeader() {
  return (
    <nav className="h-fit bg-green-500 w-full flex justify-between">
      <p>search</p>
      <AddItemDialog />
    </nav>
  );
}
