import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { CircleTag } from "@atoms/index";
import { Item, ItemGrade, ItemType, getDurability } from "@/app/types/common";
import { deleteUserItem } from "@/app/apis/inventoryApi";
import { setActive, setPassive, setWeapon } from "@/app/redux/slice/userSlice";
import { useEffect } from "react";
import { CombinationCardItemInfo } from "./combination-card-item-info";
import { CombinationCardEffect } from "./combination-card-effect";
import { CombinationActionButtons } from "./combination-action-buttons";

interface CombinationItemCardProps {
  item: Item;
  isCombinationSelected?: boolean;
  onClose: () => void;
  onCombinationClick?: () => void;
  onSet: (item: Item) => void; // 아이템을 추가하는 함수
  onCancel: (item: Item) => void; // 아이템을 취소하는 함수
  setItems?: React.Dispatch<React.SetStateAction<Item[]>>; // 아이템 목록을 업데이트하는 함수
}

export const CombinationItemCard = ({
  item,
  isCombinationSelected,
  onClose,
  onSet,
  onCancel,
  setItems,
}: CombinationItemCardProps) => {
  const dispatch = useDispatch();
  const { type, grade, effect } = item;
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const maxDurability = getDurability(grade as ItemGrade);

  // 현재 장착된 무기, 패시브, 액티브 아이템을 가져오기
  const equippedWeapon = useSelector(
    (state: RootState) => state.user.equipment.weapon,
  );
  const equippedPassive = useSelector(
    (state: RootState) => state.user.equipment.passive,
  );
  const equippedActive = useSelector(
    (state: RootState) => state.user.equipment.active,
  );

  useEffect(() => {
    console.log("아이템; ", item);
  }, []);

  // 아이템 삭제
  const handleDeleteClick = async () => {
    try {
      if (!accessToken) {
        throw new Error("토큰이 필요합니다.");
      }
      await deleteUserItem(accessToken, item.inventoryId);

      // 아이템 목록에서 삭제된 아이템 제거
      if (setItems) {
        setItems((prevItems) =>
          prevItems.filter(
            (prevItem) => prevItem.inventoryId !== item.inventoryId,
          ),
        );
      }

      // 합성을 위해 선택된 아이템이라면 취소
      onCancel(item);

      // Redux 상태에서 장착된 아이템 해제
      if (
        type === "weapon" &&
        equippedWeapon &&
        equippedWeapon.inventoryId === item.inventoryId
      ) {
        dispatch(setWeapon({ inventoryId: null, itemId: null }));
      } else if (
        type === "passive" &&
        equippedPassive &&
        equippedPassive.inventoryId === item.inventoryId
      ) {
        dispatch(setPassive({ inventoryId: null, itemId: null }));
      } else if (
        type === "active" &&
        equippedActive &&
        equippedActive.inventoryId === item.inventoryId
      ) {
        dispatch(setActive({ inventoryId: null, itemId: null }));
      }

      onClose(); // 모달 닫기
    } catch (error) {
      console.error("아이템 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="flex justify-center items-center p-2 w-[240px] rounded-lg h-[320px] bg-gradient-to-b from-catch-gray-200 to-catch-sub-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center w-full h-full bg-white rounded-md">
          {/* 원형 태그 */}
          <div className="h-[5%] w-full justify-end flex p-2 mt-2">
            <CircleTag
              grade={grade as ItemGrade}
              className={
                grade === "normal"
                  ? "bg-catch-gray-300"
                  : grade === "rare"
                    ? "bg-catch-tier-Gold"
                    : "bg-catch-tier-Diamond"
              }
            />
          </div>
          {/* 아이템 정보 섹션 */}
          <CombinationCardItemInfo item={item} maxDurability={maxDurability} />

          {/* 아이템 효과 섹션 */}
          <CombinationCardEffect
            type={type as ItemType}
            effect={effect || "스킬"}
          />

          {/* 합성 및 삭제 버튼 섹션 */}
          <CombinationActionButtons
            isCombinationSelected={isCombinationSelected || false}
            onSet={onSet}
            onCancel={onCancel}
            handleDeleteClick={handleDeleteClick}
            item={item}
          />
        </div>
      </div>
    </div>
  );
};
