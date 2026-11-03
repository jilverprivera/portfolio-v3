"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// On a project detail the footer starts where the content does, beside the fixed sidebar, instead of under it.
export function ProjectFooterFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDetail = /^\/projects\/[^/]+\/?$/.test(pathname);
  return <div className={isDetail ? "lg:pl-64 [&>footer]:md:px-12" : undefined}>{children}</div>;
}
