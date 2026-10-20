"use client";

import FlowingMenu from "@/components/FlowingMenu";

type MenuItem = { text: string; link: string; meta?: string; tag?: string; marquee?: string; image?: string };

export function ProjectsMenu({ items }: { items: MenuItem[] }) {
  return (
    <FlowingMenu
      items={items as never[]}
      ariaLabel="Projects"
      textColor="#ffffff"
      bgColor="#000000"
      marqueeBgColor="#E7F451"
      marqueeTextColor="#000000"
      borderColor="rgba(255, 255, 255, 0.18)"
      showIndex
      showArrow
      activeIndex={undefined}
      onItemClick={undefined}
      style={undefined}
    />
  );
}
