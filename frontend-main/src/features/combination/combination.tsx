import { PrimaryButton } from "@/shared/components/atoms";
import { BottomNavBar } from "@/shared/ui";
// import Plus from "@/assets/icons/plus.svg?react";
// import { CombinationLibrary } from "./combination-library";
// import { useEffect, useState } from "react";
// import { generateItemImagePath, Item } from "@/app/types/common";
// import { CombinationCell } from "./combination-cell";
// import axios from "axios";

// import { useState } from "react";

export const Combination = () => {
  // const [items, setItems] = useState<Item[]>([]);

  // const [combineItems] = useState<number[]>([1, 2]);

  // const [item1, setItem1] = useState<Item | null>(null);
  // const [item2, setItem2] = useState<Item | null>(null);
  // const [modalOpen, setModalOpen] = useState(true);

  // useEffect(() => {
  //   const loadItems = async () => {
  //     // const data: Item[] = [
  //     //   {
  //     //     id: 1,
  //     //     itemId: 1,
  //     //     name: "메이플 창",
  //     //     type: "weapon",
  //     //     grade: "rare",
  //     //     skill: "사거리+30%",
  //     //     season: "autumn",
  //     //     description: "단풍잎",
  //     //     image: "",
  //     //     durability: 10,
  //     //   },
  //     //   {
  //     //     id: 2,
  //     //     itemId: 2,
  //     //     name: "잭오랜턴",
  //     //     type: "passive",
  //     //     grade: "normal",
  //     //     skill: "피해 감소+20%",
  //     //     season: "autumn",
  //     //     description: "호박",
  //     //     image: "",
  //     //     durability: 5,
  //     //   },
  //     //   {
  //     //     id: 3,
  //     //     itemId: 3,
  //     //     name: "솔 폭탄",
  //     //     type: "active",
  //     //     grade: "legend",
  //     //     skill: "설치 형 폭탄",
  //     //     season: "autumn",
  //     //     description: "솔방울",
  //     //     image: "",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 4,
  //     //     itemId: 4,
  //     //     name: "드래곤플라이",
  //     //     type: "active",
  //     //     grade: "legend",
  //     //     skill: "자기장 내 랜덤 순간이동",
  //     //     season: "autumn",
  //     //     description: "잠자리",
  //     //     image: "",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 5,
  //     //     itemId: 5,
  //     //     name: "코스모 완드",
  //     //     type: "weapon",
  //     //     grade: "legend",
  //     //     skill: "뒤로 넉백 +100%",
  //     //     season: "autumn",
  //     //     description: "코스모스",
  //     //     image: "",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 6,
  //     //     itemId: 6,
  //     //     name: "곰",
  //     //     type: "passive",
  //     //     grade: "rare",
  //     //     skill: "체력 증가+100% 크기증가 30%",
  //     //     season: "autumn",
  //     //     description: "곰",
  //     //     image: "",
  //     //     durability: 10,
  //     //   },
  //     //   {
  //     //     id: 7,
  //     //     itemId: 7,
  //     //     name: "뚜기 점프",
  //     //     type: "active",
  //     //     grade: "legend",
  //     //     skill: "대시 공격 속박 0.5초",
  //     //     season: "autumn",
  //     //     description: "메뚜기",
  //     //     image: "7_active_뚜기점프",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 8,
  //     //     itemId: 8,
  //     //     name: "버섯",
  //     //     type: "active",
  //     //     grade: "normal",
  //     //     skill: "원형 공격",
  //     //     season: "autumn",
  //     //     description: "버섯",
  //     //     image: "8_active_버섯",
  //     //     durability: 5,
  //     //   },
  //     //   {
  //     //     id: 9,
  //     //     itemId: 9,
  //     //     name: "황금 옥수수",
  //     //     type: "weapon",
  //     //     grade: "rare",
  //     //     skill: "속박 0.5초 넉백 50%",
  //     //     season: "autumn",
  //     //     description: "옥수수",
  //     //     image: "9_weapon_황금옥수수",
  //     //     durability: 10,
  //     //   },
  //     //   {
  //     //     id: 10,
  //     //     itemId: 10,
  //     //     name: "다라미",
  //     //     type: "passive",
  //     //     grade: "normal",
  //     //     skill: "이속+15%",
  //     //     season: "autumn",
  //     //     description: "다람쥐",
  //     //     image: "10_passive_다라미",
  //     //     durability: 5,
  //     //   },
  //     //   {
  //     //     id: 11,
  //     //     itemId: 11,
  //     //     name: "갤럭시 문",
  //     //     type: "active",
  //     //     grade: "legend",
  //     //     skill: "미니맵 전체 보기, 카서스궁",
  //     //     season: "autumn",
  //     //     description: "보름달",
  //     //     image: "11_active_갤럭시문",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 12,
  //     //     itemId: 12,
  //     //     name: "허수아비",
  //     //     type: "active",
  //     //     grade: "legend",
  //     //     skill: "허수아비로 변신",
  //     //     season: "autumn",
  //     //     description: "허수아비",
  //     //     image: "",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 13,
  //     //     itemId: 1,
  //     //     name: "메이플 창",
  //     //     type: "weapon",
  //     //     grade: "rare",
  //     //     skill: "사거리+30%",
  //     //     season: "autumn",
  //     //     description: "단풍잎",
  //     //     image: "",
  //     //     durability: 10,
  //     //   },
  //     //   {
  //     //     id: 14,
  //     //     itemId: 2,
  //     //     name: "황금 옥수수",
  //     //     type: "weapon",
  //     //     grade: "rare",
  //     //     skill: "속박 0.5초 넉백 50%",
  //     //     season: "autumn",
  //     //     description: "옥수수",
  //     //     image: "14_weapon_황금옥수수",
  //     //     durability: 10,
  //     //   },
  //     //   {
  //     //     id: 15,
  //     //     itemId: 3,
  //     //     name: "메이플 창",
  //     //     type: "weapon",
  //     //     grade: "rare",
  //     //     skill: "사거리+30%",
  //     //     season: "autumn",
  //     //     description: "단풍잎",
  //     //     image: "1_weapon_메이플창",
  //     //     durability: 10,
  //     //   },
  //     //   {
  //     //     id: 16,
  //     //     itemId: 4,
  //     //     name: "잭오랜턴",
  //     //     type: "passive",
  //     //     grade: "normal",
  //     //     skill: "피해 감소+20%",
  //     //     season: "autumn",
  //     //     description: "호박",
  //     //     image: "2_passive_잭오랜턴",
  //     //     durability: 5,
  //     //   },
  //     //   {
  //     //     id: 17,
  //     //     itemId: 5,
  //     //     name: "솔 폭탄",
  //     //     type: "active",
  //     //     grade: "legend",
  //     //     skill: "설치 형 폭탄",
  //     //     season: "autumn",
  //     //     description: "솔방울",
  //     //     image: "3_active_솔폭탄",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 18,
  //     //     itemId: 6,
  //     //     name: "드래곤플라이",
  //     //     type: "active",
  //     //     grade: "legend",
  //     //     skill: "자기장 내 랜덤 순간이동",
  //     //     season: "autumn",
  //     //     description: "잠자리",
  //     //     image: "4_active_드래곤플라이",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 19,
  //     //     itemId: 7,
  //     //     name: "코스모 완드",
  //     //     type: "weapon",
  //     //     grade: "legend",
  //     //     skill: "뒤로 넉백 +100%",
  //     //     season: "autumn",
  //     //     description: "코스모스",
  //     //     image: "5_weapon_코스모완드",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 20,
  //     //     itemId: 8,
  //     //     name: "곰",
  //     //     type: "passive",
  //     //     grade: "rare",
  //     //     skill: "체력 증가+100% 크기증가 30%",
  //     //     season: "autumn",
  //     //     description: "곰",
  //     //     image: "6_passive_곰",
  //     //     durability: 10,
  //     //   },
  //     //   {
  //     //     id: 21,
  //     //     itemId: 9,
  //     //     name: "뚜기 점프",
  //     //     type: "active",
  //     //     grade: "legend",
  //     //     skill: "대시 공격 속박 0.5초",
  //     //     season: "autumn",
  //     //     description: "메뚜기",
  //     //     image: "7_active_뚜기점프",
  //     //     durability: 15,
  //     //   },
  //     //   {
  //     //     id: 22,
  //     //     itemId: 10,
  //     //     name: "버섯",
  //     //     type: "active",
  //     //     grade: "normal",
  //     //     skill: "원형 공격",
  //     //     season: "autumn",
  //     //     description: "버섯",
  //     //     image: "8_active_버섯",
  //     //     durability: 5,
  //     //   },
  //     //   {
  //     //     id: 23,
  //     //     itemId: 11,
  //     //     name: "황금 옥수수",
  //     //     type: "weapon",
  //     //     grade: "rare",
  //     //     skill: "속박 0.5초 넉백 50%",
  //     //     season: "autumn",
  //     //     description: "옥수수",
  //     //     image: "9_weapon_황금옥수수",
  //     //     durability: 10,
  //     //   },
  //     //   {
  //     //     id: 24,
  //     //     itemId: 12,
  //     //     name: "다라미",
  //     //     type: "passive",
  //     //     grade: "normal",
  //     //     skill: "이속+15%",
  //     //     season: "autumn",
  //     //     description: "다람쥐",
  //     //     image: "10_passive_다라미",
  //     //     durability: 5,
  //     //   },
  //     // ];
  //     // const itemsWithImages = data.map((item) => ({
  //     // ...item,
  //     // image: generateItemImagePath(item.itemId),
  //     // }));
  //     // setItems(itemsWithImages);
  //   };

  //   loadItems();
  // }, []);

  // useEffect(() => {
  // if (items.length > 0) {
  // setItem12();
  // }
  // }, [combineItems, items]); // combineItems 또는 items가 변경될 때마다 실행

  // item1 또는 item2가 업데이트되면 이를 콘솔에 출력해 확인
  // useEffect(() => {
  // console.log("item1 updated: ", item1);
  // }, [item1]);

  // useEffect(() => {
  // console.log("item2 updated: ", item2);
  // }, [item2]);

  // const handleCombine = async () => {
  // console.log("합성하기 api 실행");

  // try {
  // const response = await axios.post(
  // "https://j11b106.p.ssafy.io/api/main/combinations",
  // {
  // email: "seung@dd",
  // item1: item1?.itemId,
  // item2: item2?.itemId,
  // },
  // );

  // console.log("합성 api 성공:", response.data);
  // } catch (error) {
  // console.error("합성 api 실패:", error);
  // }
  // };

  // const setItem12 = () => {
  // item1,2 설정
  // if (combineItems[0] !== null && combineItems[0] !== undefined) {
  // const itemTemp1 = getItemById(combineItems[0]);
  // setItem1(itemTemp1 || null); // 아이템이 없을 경우 null로 설정
  // }
  // if (combineItems[1] !== null && combineItems[1] !== undefined) {
  // const itemTemp2 = getItemById(combineItems[1]);
  // setItem2(itemTemp2 || null); // 아이템이 없을 경우 null로 설정
  // }
  // };

  // const getItemById = (id: number) => {
  // return items.find((item) => item.itemId === id);
  // };

  // const handleItemClick = () => {};

  // const handleOpenModal = (itemId: number) => {
  //   setModalOpen(true);
  // };
  return (
    <div className="w-full h-full">
      <div className="w-full h-[30%] flex flex-col">
        {/* <div className="flex items-center flex-row justify-center gap-5 w-full h-[70%]">
          {item1 ? (
            <CombinationCell
              key={0}
              id={item1.id}
              name={item1.name}
              type={item1.type}
              image={item1.image}
            />
          ) : (
            <CombinationCell key={0} name="Empty" type="unknown" />
          )}
          <Plus />
          {item2 ? (
            <CombinationCell
              key={1}
              id={item2.id}
              name={item2.name}
              type={item2.type}
              image={item2.image}
            />
          ) : (
            <CombinationCell key={1} name="Empty" type="unknown" />
          )}
        </div> */}
        <div className="flex flex-row w-full h-[30%] justify-center items-center">
          <PrimaryButton
            color="main"
            size="small"
            showIcon={false}
            // onClick={handleCombine}
          >
            합성하기
          </PrimaryButton>
        </div>
      </div>
      <div className="w-full h-[70%]">
        {/* <CombinationLibrary> */}
        <BottomNavBar />
        {/* </CombinationLibrary> */}
      </div>
      {/* {modalOpen && <div className="w-screen h-screen bg-black">모달</div>} */}
    </div>
  );
};
