//  # 착용 장비

import { EquippedCell } from "@entities/index"; // InGameStats 컴포넌트 가져오기

export const EquippedItems = () => {
  return (
    <div className="flex justify-around">
      <EquippedCell itemType="weapon" showCaption={true} />
      <EquippedCell itemType="active" showCaption={true} />
      <EquippedCell itemType="passive" showCaption={true} />
    </div>
  );
};
