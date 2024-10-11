import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
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
import { deleteUserItem } from "@/app/apis/inventoryApi";
import { setActive, setPassive, setWeapon } from "@/app/redux/slice/userSlice";
import { useEffect } from "react";

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
  const { itemId, name, type, grade, durability, effect } = item;
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
              className="bg-catch-gray-300"
            />
          </div>
          {/* 이미지, 아이템 이름, 내구도 */}
          <div className="h-[65%] w-full flex flex-col justify-center gap-2 items-center">
            <div className="w-[100px] h-[100px] rounded-xl flex items-center justify-center">
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
              {/* 합성 */}
              {isCombinationSelected ? (
                <button onClick={() => onCancel(item)}>
                  <Body2Text className="font-bold text-catch-gray-500">
                    합성 취소
                  </Body2Text>
                </button>
              ) : (
                <button onClick={() => onSet(item)}>
                  <Body2Text className="font-bold text-catch-gray-500">
                    합성 추가
                  </Body2Text>
                </button>
              )}
              <button onClick={() => handleDeleteClick()}>
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
