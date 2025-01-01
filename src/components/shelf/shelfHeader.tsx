"use client";

import { useState } from "react";

function AddItemDrawer({ open, toggleOpen }: { open: boolean; toggleOpen: () => void }) {
  return (
<>h</>
  );
}

export default function ShelfHeader() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

  return (
    <div className="h-5 bg-green-500 w-full flex justify-between">
      <p>search</p>
      <p>add</p>
    </div>
  );
}
