import { useDispatch, useSelector } from "react-redux";
import {
  Body1Text,
  Caption1Text,
  CircleTag,
  ItemTypeTag,
  AutumnItemImage,
  Body2Text,
} from "@atoms/index";
import { Line } from "@ui/index";
import { Item, ItemGrade, ItemType, getDurability } from "@/app/types/common";
import { setWeapon, setPassive, setActive } from "@/app/redux/slice/userSlice";
import { RootState } from "@/app/redux/store";
import {
  equipUserItem,
  unequipUserItem,
  deleteUserItem,
} from "@/app/apis/inventoryApi";

interface InventoryItemCardProps {
  item: Item;
  onClose: () => void;
  setItems?: React.Dispatch<React.SetStateAction<Item[]>>;
  onCombinationClick?: () => void;
}

export const InventoryItemCard = ({
  item,
  onClose,
  setItems,
}: InventoryItemCardProps) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { itemId, name, type, grade, durability, effect } = item;
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

  // 아이템이 이미 장착된 상태인지 검사
  const isEquipped =
    (type === "weapon" &&
      equippedWeapon &&
      equippedWeapon.inventoryId === item.inventoryId) ||
    (type === "passive" &&
      equippedPassive &&
      equippedPassive.inventoryId === item.inventoryId) ||
    (type === "active" &&
      equippedActive &&
      equippedActive.inventoryId === item.inventoryId);

  // 아이템 장착 처리 함수
  const handleEquipClick = async () => {
    try {
      if (!accessToken) {
        throw new Error("토큰이 필요합니다.");
      }

      if (isEquipped) {
        // 장착 해제
        await unequipUserItem(accessToken, item.inventoryId);
        if (type === "weapon") {
          dispatch(setWeapon({ inventoryId: null, itemId: null }));
        } else if (type === "passive") {
          dispatch(setPassive({ inventoryId: null, itemId: null }));
        } else if (type === "active") {
          dispatch(setActive({ inventoryId: null, itemId: null }));
        }
      } else {
        // 장착
        if (type === "weapon") {
          if (equippedWeapon.inventoryId !== null) {
            await unequipUserItem(accessToken, equippedWeapon.inventoryId);
          }
          await equipUserItem(accessToken, item.inventoryId);
          dispatch(
            setWeapon({ inventoryId: item.inventoryId, itemId: item.itemId }),
          );
        } else if (type === "passive") {
          if (equippedPassive.inventoryId !== null) {
            await unequipUserItem(accessToken, equippedPassive.inventoryId);
          }
          await equipUserItem(accessToken, item.inventoryId);
          dispatch(
            setPassive({ inventoryId: item.inventoryId, itemId: item.itemId }),
          );
        } else if (type === "active") {
          if (equippedActive.inventoryId !== null) {
            await unequipUserItem(accessToken, equippedActive.inventoryId);
          }
          await equipUserItem(accessToken, item.inventoryId);
          dispatch(
            setActive({ inventoryId: item.inventoryId, itemId: item.itemId }),
          );
        }
      }
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("아이템 장착/해제 중 오류 발생:", error);
    }
  };

  // 아이템 삭제 처리 함수
  const handleDeleteClick = async () => {
    try {
      if (!accessToken) {
        throw new Error("토큰이 필요합니다.");
      }
      await deleteUserItem(accessToken, item.inventoryId);
      if (setItems) {
        setItems((prevItems) =>
          prevItems.filter(
            (prevItem) => prevItem.inventoryId !== item.inventoryId,
          ),
        );
      }
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
      onClose();
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
              className="bg-catch-gray-300"
            />
          </div>
          {/* 이미지, 아이템 이름, 내구도 */}
          <div className="h-[65%] w-full flex flex-col justify-center gap-2 items-center">
            <div className="w-[100px] h-[100px] rounded-xl">
              <AutumnItemImage itemId={itemId} />
            </div>
            <Body1Text className="!text-catch-gray-300">{name}</Body1Text>
            <Line className="bg-catch-gray-200" />
            <Caption1Text>
              {durability}/{maxDurability} hp
            </Caption1Text>
          </div>
          {/* 아이템타입, 스킬 */}
          <div className="h-[15%] w-full flex items-center justify-center flex-col gap-1">
            <ItemTypeTag color="gray" type={type as ItemType} />
            <Caption1Text>{effect}</Caption1Text>
          </div>
          {/* 장착해제 토글 */}
          <div className="h-[15%] w-full flex items-center justify-center flex-col gap-1">
            <div className="flex flex-row items-center justify-around w-full h-full">
              {/* 인벤토리 */}
              <button onClick={handleEquipClick}>
                <Body2Text className="font-bold text-catch-gray-500">
                  {isEquipped ? "해제" : "장착"}
                </Body2Text>
              </button>
              <button onClick={handleDeleteClick}>
                <Body2Text className="font-bold text-catch-system-color-error">
                  삭제
                </Body2Text>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
