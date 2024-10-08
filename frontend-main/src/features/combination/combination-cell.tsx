import { AutumnItemImage } from "@atoms/index";

interface CombinationCellProps {
  onClick?: () => void;
  itemId: number;
  inventoryId?: number;
  className?: string;
}

export const CombinationCell = ({
  onClick,
  itemId,
  className,
}: CombinationCellProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center p-[6px] rounded-lg bg-gradient-to-br w-[100px] h-[100px] from-gray-100 to-gray-400 ${className}`}
    >
      <div
        className={`rounded-md flex items-center w-full h-full justify-center bg-white `}
      >
        {itemId !== 0 ? <AutumnItemImage itemId={itemId} /> : null}
      </div>
    </div>
  );
};
