import { ItemLibrary } from "@entities/index";
import { InventoryUserInfo } from "@/features/index";

export const Inventory = () => {
  return (
    <div className="w-full h-full">
      <InventoryUserInfo />
      <ItemLibrary />
    </div>
  );
};
