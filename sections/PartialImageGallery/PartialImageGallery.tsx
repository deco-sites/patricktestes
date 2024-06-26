import { ImageWidget } from "apps/admin/widgets.ts";

import { usePartialSection } from "deco/hooks/usePartialSection.ts";

import Image from "apps/website/components/Image.tsx";

export interface Props {
  title: string;
  images: ImageWidget[];
  showQuantity: number;
}

export default function PartialImageGallery({ images, showQuantity }: Props) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
        {images.slice(0, showQuantity).map((image, index) => {
          return (
            <div className="w-40 md:w-72 flex justify-center items-center overflow-hidden rounded md:rounded-xl duration-300 hover:scale-110">
              <Image
                src={image}
                alt={image}
                width={304}
                height={200}
                preload
                loading="eager"
                fetchPriority="high"
              />
            </div>
          );
        })}
      </div>

      {showQuantity < images.length && (
        <div className="flex justify-center items-center">
          <button
            className="btn btn-primary"
            {...usePartialSection({
              mode: "replace",
              props: { showQuantity: showQuantity + 1 },
            })}
          >
            Ver mais
          </button>
        </div>
      )}
    </div>
  );
}
