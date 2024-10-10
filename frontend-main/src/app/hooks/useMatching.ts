import { useState, useEffect } from "react";
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
  const [expectation, setExpectation] = useState("");

  useEffect(() => {
    if (roomcode) {
      window.location.href = `/game?email=${encodeURIComponent(email)}&nickname=${encodeURIComponent(nickname)}&rating=${rating}&roomcode=${encodeURIComponent(roomcode)}`;
    }
  }, [roomcode, nickname, rating, email]);

  const connectAndSendMessage = async () => {
    try {
      const client = await connectToMatching(nickname, (message) => {
        const parsedMessage =
          typeof message === "string" ? JSON.parse(message) : message;

        if (parsedMessage.type === "ROOMCODE") {
          setRoomcode(parsedMessage.roomId);
        } else if (parsedMessage.type === "TIME") {
          setExpectation(parsedMessage.time);
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
    }
  };

  const disconnect = () => {
    if (stompClient) {
      disconnectFromMatching(stompClient);
      setIsMatchingStatus(false);
    }
  };

  return { isMatchingStatus, expectation, connectAndSendMessage, disconnect };
};
