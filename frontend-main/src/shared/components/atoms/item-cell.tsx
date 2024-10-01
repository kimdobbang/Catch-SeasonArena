interface ItemCellProps {
  onClick?: () => void;
  item: string;
  symbol?: JSX.Element;
  season?: string;
  itemType: string;
}

export const ItemCell = ({
  onClick,
  item,
  symbol,
  itemType,
}: ItemCellProps) => {
  return (
    <div
      className={`flex items-center bg-catch-gray-000 justify-center p-2 cursor-pointer ${itemType === "equipment" ? "border-catch-gray-300" : "border-catch-gray-200"} ${onClick ? "hover:bg-catch-gray-200 hover:text-white" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-8 h-8">{symbol}</div>
      <div>
        <div>{itemType}</div>
        <p className="ml-2 text-catch-gray-600">{item}</p>
      </div>
    </div>
  );
};
