"use client";

import { ImageThumb } from "@/components/project/image-modal";

// Cover of a project. Click it to open the large viewer.
export function CoverImage({ src, title }: { src: string; title: string }) {
  return (
    <ImageThumb
      image={{ src, title, width: 2160, height: 1350 }}
      className="block w-full overflow-hidden rounded-[8px] border border-white/15 hover:border-white/40"
      imgClassName="block h-auto w-full"
    />
  );
}
