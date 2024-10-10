import config from "@/config";
import SockJS from "sockjs-client";
import { Client, IMessage } from "@stomp/stompjs";

interface MatchingRequest {
  nickname: string;
  rating: number;
  items: number[];
  avatar: string;
}

// WebSocket 연결
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
      resolve(client);
    };

    client.onStompError = (frame) => {
      console.error("STOMP 오류:", frame.headers["message"]);
      reject(new Error(frame.body));
    };

    client.onWebSocketError = (error) => {
      console.error("WebSocket 오류:", error);
      reject(error);
    };

    client.activate();
  });
};

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

export const disconnectFromMatching = async (
  client: Client,
  nickname: string,
): Promise<void> => {
  try {
    client.publish({
      destination: "/api/matching/pub/exit",
      body: JSON.stringify({ nickname }),
    });
    console.log("매칭 취소 요청 전송 완료:", nickname);

    await client.deactivate();
    console.log("WebSocket 연결 해제 완료:", nickname);
  } catch (error) {
    console.error("매칭 취소 중 오류 발생:", error);
    throw new Error("매칭 취소 중 문제가 발생했습니다.");
  }
};
