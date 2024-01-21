"use client";

import { useEffect, useState } from "react";
import { cn } from "../../../../lib/utils";
import { useSidebar } from "../../../../store/use-sidebar";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useIsClient } from "usehooks-ts";

interface Props {
  children: React.ReactNode;
}

export default function Wrapper({ children }: Props) {
  const isClient = useIsClient();

  const { collapsed } = useSidebar((state) => state);

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <RecommendedSkeleton />
        <ToggleSkeleton />
      </aside>
    );

  return (
    <aside
      className={cn(
        "fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
}
