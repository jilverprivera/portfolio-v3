"use client";

import { ImageThumb, type ModalImage } from "@/components/project/image-modal";

type Item = ModalImage & { caption?: string };

// Diagrams exported from the architecture docs, one per row. Click one to open it in the large viewer.
export function DiagramGallery({ items }: { items: Item[] }) {
  return (
    <div className="flex flex-col gap-12">
      {items.map((item) => (
        <figure key={item.src} className="flex flex-col gap-4">
          <ImageThumb
            image={item}
            className="rounded-[8px] border border-white/15 bg-white/[0.03] p-4 hover:border-white/40"
            imgClassName="mx-auto h-auto max-h-[720px] w-auto max-w-full object-contain"
          />
          <figcaption className="flex flex-col gap-1">
            <span className="text-[16px] font-medium text-white">{item.title}</span>
            {item.caption && <span className="text-[15px] leading-[1.5] text-white/55">{item.caption}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

type Layout = "top" | "left" | "right";
type Screenshot = ModalImage & { caption?: string; features?: string[]; layout?: Layout };

// Layouts alternate down the page unless an item sets its own: image on top with the text below,
// then image on the right with the text on the left, then the image on the left.
const CYCLE: Layout[] = ["top", "right", "left"];

function Intro({ item }: { item: Screenshot }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[24px] font-medium leading-tight text-white">{item.title}</span>
      {item.caption && <span className="text-[17px] leading-[1.6] text-white/70">{item.caption}</span>}
    </div>
  );
}

function Features({ features }: { features: string[] }) {
  return (
    <ul className="flex flex-col gap-3 text-[16px] leading-[1.55] text-white/85">
      {features.map((feature) => (
        <li
          key={feature}
          className="relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#E7F451]"
        >
          {feature}
        </li>
      ))}
    </ul>
  );
}

function Details({ item }: { item: Screenshot }) {
  return (
    <div className="flex flex-col gap-6">
      <Intro item={item} />
      {item.features && <Features features={item.features} />}
    </div>
  );
}

// Product screenshots with what each screen is for and what it brings. Click one to open the large viewer.
export function ScreenshotGallery({ items }: { items: Screenshot[] }) {
  return (
    <div className="flex flex-col gap-28">
      {items.map((item, index) => {
        const layout = item.layout ?? CYCLE[index % CYCLE.length];
        const image = (
          <ImageThumb
            image={item}
            className="block w-full overflow-hidden rounded-[8px] border border-white/15 hover:border-white/40"
            imgClassName="block h-auto w-full"
          />
        );

        if (layout === "top") {
          return (
            <figure key={item.src} className="flex flex-col gap-8">
              {image}
              <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] md:gap-16">
                <Intro item={item} />
                {item.features && <Features features={item.features} />}
              </div>
            </figure>
          );
        }

        // Text 40% and image 60%, mirrored when the image goes on the left.
        const imageLeft = layout === "left";
        return (
          <figure
            key={item.src}
            className={`grid items-center gap-8 lg:gap-14 ${
              imageLeft ? "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : "lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            }`}
          >
            <div className={imageLeft ? "lg:order-2" : "lg:order-1"}>
              <Details item={item} />
            </div>
            <div className={imageLeft ? "lg:order-1" : "lg:order-2"}>{image}</div>
          </figure>
        );
      })}
    </div>
  );
}
