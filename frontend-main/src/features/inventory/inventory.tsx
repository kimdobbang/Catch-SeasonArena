import { InventoryUserInfo, ItemLibrary } from "@entities/index";

export const Inventory = () => {
  return (
    <div className="w-full h-full">
      <InventoryUserInfo />
      <ItemLibrary />
    </div>
  );
};
