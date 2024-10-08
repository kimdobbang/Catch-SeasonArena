// 책임 분리
// 각 컴포넌트: 상태관리, 스토리지 관리, API 처리 책임
// Api: API 호출과 서버 통신 책임, 데이터 통신(여기서 상태관리x)
import axios from "axios";
import config from "@/config";

interface CombineItemsProps {
  accessToken: string;
  item1: number;
  item2: number;
}

export const combineItems = async ({
  accessToken,
  item1,
  item2,
}: CombineItemsProps) => {
  try {
    const response = await axios.post(
      `${config.API_BASE_URL}/api/auth/combinations/${item1}/${item2}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log("합성 실패: ", error);
  }
};
