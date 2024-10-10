import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import {
  connectToMatching,
  sendMatchingRequest,
  disconnectFromMatching,
} from "@/app/apis/matchingApi";

export const useMatching = (
  nickname: string,
  rating: number,
  equipment: any,
  selectedAvatar: number,
) => {
  const [isMatchingStatus, setIsMatchingStatus] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [roomcode, setRoomcode] = useState("");
  const [expectation, setExpectation] = useState("");

  useEffect(() => {
    if (roomcode) {
      window.location.href = `/game?nickname=${nickname}&rating=${rating}&roomcode=${roomcode}`;
    }
  }, [roomcode, nickname, rating]);

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

      const userEquipments = [
        equipment.weapon,
        equipment.active,
        equipment.passive,
      ]
        .filter((item) => item?.itemId !== null && item?.itemId !== undefined)
        .map((item) => item!.itemId as number);

      const requestDto = {
        nickname,
        rating,
        items: userEquipments,
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
