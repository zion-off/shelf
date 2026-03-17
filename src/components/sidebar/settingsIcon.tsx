import { forwardRef, type ForwardedRef } from 'react';
import { Bolt } from 'lucide-react';

export const SettingsIcon = forwardRef(function SettingsIcon(
  props: React.HTMLAttributes<HTMLSpanElement>,
  ref: ForwardedRef<HTMLSpanElement>
) {
  return (
    <span
      {...props}
      ref={ref}
      className="md:opacity-0 group-hover/fav:opacity-100 transition-all duration-150 hover:bg-neutral-200 dark:hover:bg-neutral-900 aspect-square rounded-md cursor-pointer"
    >
      <Bolt className="stroke-neutral-300 dark:stroke-neutral-600 aspect-square rounded-md cursor-pointer p-[3px]" />
    </span>
  );
});