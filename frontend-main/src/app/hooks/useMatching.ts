import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import {
  connectToMatching,
  sendMatchingRequest,
  disconnectFromMatching,
} from "@/app/apis/matchingApi";

export const useMatching = (
  email: string,
  nickname: string,
  rating: number,
  equipment: number[],
  selectedAvatar: number,
) => {
  const [isMatchingStatus, setIsMatchingStatus] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [roomcode, setRoomcode] = useState("");
  const [expectation, setExpectation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (roomcode) {
      window.location.href = `/game?email=${encodeURIComponent(email)}&nickname=${encodeURIComponent(nickname)}&rating=${rating}&roomcode=${encodeURIComponent(roomcode)}`;
    }
  }, [roomcode, nickname, rating, email]);

  const connectAndSendMessage = useCallback(async () => {
    try {
      const client = await connectToMatching(nickname, (message) => {
        try {
          const parsedMessage = parseMessage(message);

          if (parsedMessage.type === "ROOMCODE") {
            setRoomcode(parsedMessage.roomId);
          } else if (parsedMessage.type === "TIME") {
            setExpectation(parsedMessage.time);
          }
        } catch (err) {
          console.error("메시지 처리 중 오류:", err);
          setError("서버에서 잘못된 데이터를 수신했습니다.");
        }
      });

      setStompClient(client);
      setIsMatchingStatus(true);

      const requestDto = {
        nickname,
        rating,
        items: equipment,
        avatar: selectedAvatar.toString(),
      };
      sendMatchingRequest(client, requestDto);
    } catch (error) {
      console.error("매칭 연결 중 오류 발생:", error);
      setError("매칭 연결 중 문제가 발생했습니다.");
    }
  }, [nickname, rating, equipment, selectedAvatar]);

  const disconnect = useCallback(async () => {
    if (stompClient) {
      await disconnectFromMatching(stompClient, nickname);
      setIsMatchingStatus(false);
    }
  }, [stompClient, nickname]);

  return {
    isMatchingStatus,
    expectation,
    connectAndSendMessage,
    disconnect,
    error,
  };
};

const parseMessage = (message: string) => {
  return typeof message === "string" ? JSON.parse(message) : message;
};
