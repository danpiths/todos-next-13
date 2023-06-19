"use client";

import { CollapsibleContent } from "@/ui/collapsible";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Todos({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <CollapsibleContent className={className} ref={parent}>
      {children}
    </CollapsibleContent>
  );
}
