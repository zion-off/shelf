import { IItem } from "@/interfaces";

export default function ShelfView({ items }: { items: IItem[] }) {
  return (
    <div>
      {items.length > 0
        ? items.map((item) => {
            return <p key={item._id.toString()}>{item.title}</p>;
          })
        : "No items yet"}
    </div>
  );
}