/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrimaryButton } from "@/shared/components/atoms";
import { BottomNavBar } from "@/shared/ui";
import Plus from "@/assets/icons/plus.svg?react";
import { fetchUserItems } from "@/app/apis/inventoryApi";
import { CombinationLibrary } from "./combination-library";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "@/app/types/common";
import { CombinationCell } from "./combination-cell";
import { combineItems } from "@/app/apis/combination-api";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { CombinationItemCard } from "./combination-item-card";

export const Combination = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [items, setItems] = useState<Item[]>([]);
  const [combineItem1, setCombineItem1] = useState<Item | null>(null);
  const [combineItem2, setCombineItem2] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  interface combinationApiSuccess {
    itemId: number;
    name: string;
    season: string;
    type: string;
    effect: string;
    description: string;
    grade: string;
    image: string;
  }

  const handleSuccessResponse = (item: combinationApiSuccess | null) => {
    if (!item) {
      // item이 null일 때 처리
      console.error("아이템 정보가 없습니다.");
      return null; // null을 반환하여 후속 로직이 실행되지 않도록 처리
    }

    const resultDTO = {
      name: item.name,
      itemId: item.itemId,
      type: item.type,
      grade: item.grade,
      effect: item.effect,
    };
    return resultDTO;
  };

  useEffect(() => {
    const loadItems = async () => {
      try {
        const fetchedItems = await fetchUserItems(accessToken);
        setItems(fetchedItems);
      } catch (error) {
        console.error("아이템을 가져오는 데 실패했습니다.", error);
      }
    };

    if (accessToken) {
      loadItems();
    }
  }, []);

  const handleCombine = async () => {
    if (!combineItem1?.inventoryId || !combineItem2?.inventoryId) {
      alert("합성할 아이템을 모두 선택하세요");
      return;
    }

    const combineDTO = {
      accessToken: accessToken,
      item1: combineItem1?.inventoryId,
      item2: combineItem2?.inventoryId,
    };

    const response = await combineItems(combineDTO);

    if (response.message === "Failure") {
      navigate("failure");
    } else {
      const resultItem = handleSuccessResponse(response.data.item);
      if (resultItem) {
        console.log("찾은 아이템: ", resultItem);
        navigate("success", {
          state: resultItem,
        });
      } else {
        console.error("합성 결과가 유효하지 않습니다.");
        navigate("failure"); // 실패 페이지로 리다이렉트
      }
    }
  };

  const setCombinationItem = (selectedCombineItem: Item) => {
    if (combineItem1 == null) {
      setCombineItem1(selectedCombineItem);
    } else if (combineItem1 != null && combineItem2 == null) {
      setCombineItem2(selectedCombineItem);
    } else if (combineItem1 != null && combineItem2 != null) {
      alert("아이템 하나를 빼세요");
    } else if (
      selectedCombineItem.inventoryId ==
      (combineItem1.inventoryId || combineItem2?.inventoryId)
    ) {
      alert("이미 담겨있는 아이템입니다.");
    }
    setIsModalOpen(false);
  };

  const cancelCombinationItem = (selectedCombineItem: Item) => {
    if (combineItem1?.inventoryId == selectedCombineItem.inventoryId) {
      setCombineItem1(null);
    } else if (combineItem2?.inventoryId == selectedCombineItem.inventoryId) {
      setCombineItem2(null);
    } else {
      console.log("합성을 위해 담은 아이템이 아닙니다");
    }
    setIsModalOpen(false);
  };

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const checkIsCombinationSelected = (item: Item) => {
    if (
      item.inventoryId === combineItem1?.inventoryId ||
      item.inventoryId === combineItem2?.inventoryId
    )
      return true;
    else return false;
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-[30%] flex flex-col">
        <div className="flex items-center flex-row justify-center gap-5 w-full h-[70%]">
          {combineItem1 ? (
            <CombinationCell
              onClick={() => handleItemClick(combineItem1)}
              inventoryId={combineItem1?.inventoryId}
              itemId={combineItem1?.itemId}
            />
          ) : (
            <CombinationCell inventoryId={0} itemId={0} />
          )}
          <Plus />
          {combineItem2 ? (
            <CombinationCell
              onClick={() => handleItemClick(combineItem2)}
              inventoryId={combineItem2?.inventoryId}
              itemId={combineItem2?.itemId}
            />
          ) : (
            <CombinationCell inventoryId={0} itemId={0} />
          )}
        </div>
        <div className="flex flex-row w-full h-[30%] justify-center items-center">
          <PrimaryButton
            color="main"
            size="small"
            showIcon={false}
            onClick={handleCombine}
          >
            합성하기
          </PrimaryButton>
        </div>
      </div>
      <div className="w-full h-[70%]">
        <CombinationLibrary items={items} handleItemClick={handleItemClick}>
          <BottomNavBar />
        </CombinationLibrary>
      </div>
      {isModalOpen && selectedItem && (
        <CombinationItemCard
          item={selectedItem}
          isCombinationSelected={checkIsCombinationSelected(selectedItem)}
          onClose={handleCloseModal}
          onSet={setCombinationItem}
          onCancel={cancelCombinationItem}
        />
      )}
    </div>
  );
};
