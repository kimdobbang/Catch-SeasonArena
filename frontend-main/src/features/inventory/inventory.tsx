import { ItemLibrary } from "@entities/index";
import { InventoryUserInfo } from "@/features/index";
import { BottomNavBar } from "@ui/index";

export const Inventory = () => {
  return (
    <div className="w-full h-full">
      <InventoryUserInfo />
      <ItemLibrary>
        <BottomNavBar />
      </ItemLibrary>
    </div>
  );
};
