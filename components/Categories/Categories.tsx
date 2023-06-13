"use client";

import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Categories({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [parent, enableAnimations] = useAutoAnimate();

  return (
    <div className={className} ref={parent}>
      {children}
    </div>
  );
}
