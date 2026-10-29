"use client";

import FlowingMenu from "@/components/FlowingMenu";

type MenuItem = { text: string; link: string; meta?: string; tag?: string; marquee?: string; image?: string };

export function ProjectsMenu({ items }: { items: MenuItem[] }) {
  return (
    <FlowingMenu
      items={items as never[]}
      ariaLabel="Projects"
      textColor="#0a0a0a"
      bgColor="#f5f5f2"
      marqueeBgColor="#ff1a4d"
      marqueeTextColor="#0a0a0a"
      borderColor="#d4d4cf"
      showIndex
      showArrow
      activeIndex={undefined}
      onItemClick={undefined}
      style={undefined}
    />
  );
}
