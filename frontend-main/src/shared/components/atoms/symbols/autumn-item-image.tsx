// src/shred/components/atoms/symbols/item-image.tsx
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import { generateItemImagePath } from "@/app/types/common";

export const AutumnItemImage = ({ itemId }: { itemId: number | null }) => {
  if (itemId === null) return null;

  const imagePath = generateItemImagePath(itemId);

  return (
    <LazyLoadImage
      src={imagePath}
      alt={`ItemId ${itemId}`}
      className="w-[80%] h-[80%] mt-1 ml-[6px]"
      effect="blur"
      placeholderSrc="/path/to/placeholder-image.jpg"
      wrapperClassName="w-full h-full flex justify-center items-center"
    />
  );
};
