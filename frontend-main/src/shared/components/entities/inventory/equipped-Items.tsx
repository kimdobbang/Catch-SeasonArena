import { EquippedCell } from "@entities/index";

export const EquippedItems = () => {
  return (
    <div className="flex justify-around">
      <EquippedCell itemType="weapon" showCaption={true} />
      <EquippedCell itemType="active" showCaption={true} />
      <EquippedCell itemType="passive" showCaption={true} />
    </div>
  );
};
