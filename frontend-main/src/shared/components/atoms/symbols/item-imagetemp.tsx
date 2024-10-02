// src/shred/components/atoms/symbols/item-image.tsx
import { generateItemImagePath } from "@/app/types/common";

export const ItemImage = ({ itemId }: { itemId: number | null }) => {
  if (itemId === null) return null;

  const imagePath = generateItemImagePath(itemId);

  return (
    <img
      src={imagePath}
      alt={`Item ${itemId}`}
      className="object-contain w-[80%] h-[80%]"
    />
  );
};
