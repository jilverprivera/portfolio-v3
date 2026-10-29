// Cover of a project. It is a plain image: it does not open the large viewer.
export function CoverImage({ src, title }: { src: string; title: string }) {
  return (
    <div className="block w-full overflow-hidden rounded-[8px] border border-line">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={title} width={2160} height={1350} className="block h-auto w-full" />
    </div>
  );
}
