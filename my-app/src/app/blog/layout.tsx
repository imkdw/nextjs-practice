"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BlogLayout() {
  const pathname = usePathname();

  return (
    <div>
      <Link href="/blog">{pathname}</Link>
    </div>
  );
}
