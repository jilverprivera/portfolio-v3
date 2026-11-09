import Image from "next/image";

// Cover of a project. It is a plain image: it does not open the large viewer.
export function CoverImage({ src, title }: { src: string; title: string }) {
  return (
    <div data-motion="cover" className="block w-full overflow-hidden rounded-[8px] border border-line">
      {/* The first thing on the page, so it loads ahead of the rest. The sidebar takes 256px from lg up. */}
      <Image
        src={src}
        alt={title}
        width={2160}
        height={1350}
        sizes="(min-width: 1024px) calc(100vw - 352px), calc(100vw - 48px)"
        preload
        className="block h-auto w-full"
      />
    </div>
  );
}
