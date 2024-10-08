// Api: API 호출과 서버 통신 책임, 데이터 통신(여기서 상태관리x)
// src/app/api/matchingApi.ts
import config from "@/config";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

// 타입 정의
interface MatchingRequest {
  nickname: string;
  rating: number;
  items: number[];
  avatar: string;
}

// STOMP 클라이언트 생성 및 연결하는 함수
export const connectToMatching = (
  nickname: string,
  onMessageReceived: (message: string) => void,
): Promise<Client> => {
  return new Promise((resolve, reject) => {
    const socket = new SockJS(`${config.API_BASE_URL}/api/matching`);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(`STOMP debug: ${str}`),
      heartbeatIncoming: 0,
    });

    client.onConnect = () => {
      client.subscribe(
        `/api/matching/sub/game/${nickname}`,
        (message: IMessage) => {
          onMessageReceived(message.body);
        },
      );
      resolve(client); // 연결 성공 시 클라이언트를 반환
    };

    client.onStompError = (frame) => {
      console.error("STOMP 오류:", frame.headers["message"]);
      reject(new Error(frame.body));
    };

    client.onWebSocketError = (error) => {
      console.error("WebSocket 오류:", error);
      reject(error);
    };

    client.activate(); // WebSocket 연결 활성화
  });
};

// 매칭 요청 메시지를 보내는 함수
export const sendMatchingRequest = (
  client: Client,
  requestDto: MatchingRequest,
) => {
  client.publish({
    destination: "/api/matching/pub/entry",
    body: JSON.stringify(requestDto),
  });
  console.log("매칭 요청 메시지 전송:", requestDto);
};

// 연결 해제 함수
export const disconnectFromMatching = (client: Client) => {
  client.deactivate();
  console.log("연결 해제됨");
};
