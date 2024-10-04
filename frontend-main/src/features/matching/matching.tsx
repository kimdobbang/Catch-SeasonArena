import React, { useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { Body1Text, PrimaryButton } from "@/shared/components/atoms";
import {
  TierProgressBar,
  UserNameContainer,
  CircleAvatar,
} from "@/shared/components/entities";
import { NavBarBackground } from "@/shared/ui";

export const Matching = () => {
  const [isMatchingStatus, setIsMatchingStatus] = useState(false); // 매칭 상태 관리
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP 클라이언트 상태
  const [isConnected, setIsConnected] = useState(false); // 연결 상태 관리
  const [nickname, setNickname] = useState(""); // 닉네임 상태
  const [rating, setRating] = useState<number>(500); // 레이팅 상태
  const [roomcode, setRoomcode] = useState("");

  const userAvatar = useSelector(
    (state: RootState) => state.user.selectedAvatar,
  );

  const goToGame = () => {
    window.location.href = `/game?nickname=${nickname}&rating=${rating}&roomcode=${roomcode}`;
  };
  const connect = () => {
    if (!nickname) {
      alert("닉네임을 입력하세요.");
      return;
    }

    const socket = new SockJS("https://j11b106.p.ssafy.io/api/matching");

    // STOMP 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => socket, // SockJS WebSocket을 사용하여 연결
      debug: (str) => {
        console.log(`STOMP debug: ${str}`);
      },
      heartbeatIncoming: 0, // Heartbeat 설정을 0으로 하여 서버의 Heartbeat 설정을 무시
    });

    console.log("clinet: ", client);

    client.onConnect = (frame) => {
      console.log("연결 성공", frame); // frame 정보 출력
      setIsConnected(true); // 연결 성공 시 상태 업데이트

      client.subscribe(`/api/matching/sub/game/${nickname}`, (message) => {
        console.log("서버로부터 수신한 메시지:", message.body);

        // 메시지 body 자체가 roomcode로 들어옴
        const roomcode = message.body;

        // roomcode가 제대로 전달되었는지 확인 후 설정
        if (roomcode && roomcode.length > 0) {
          setRoomcode(roomcode);
          console.log("룸코드:", roomcode);
        } else {
          console.error("룸코드를 찾을 수 없습니다.");
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("STOMP 오류:", frame.headers["message"]);
      console.error("상세 내용:", frame.body);
    };

    client.onWebSocketError = (error) => {
      console.error("WebSocket 오류:", error);
    };

    client.onDisconnect = () => {
      console.log("연결 해제");
      setIsConnected(false); // 연결 해제 시 상태 업데이트
    };

    client.activate(); // WebSocket 연결 활성화
    setStompClient(client); // 클라이언트 저장
    setIsMatchingStatus(true); // 매칭 상태로 변경
  };

  const sendMessage = () => {
    if (!nickname) {
      alert("닉네임을 입력하세요.");
      return;
    }

    if (!rating) {
      alert("레이팅을 입력하세요.");
      return;
    }

    if (!isConnected) {
      alert("STOMP 연결이 되어 있지 않습니다.");
      return;
    }

    const requestDto = {
      nickname: nickname,
      rating: rating, // 레이팅 정수 변환
      items: [1, 2, 3],
      avatar: "1",
    };

    // stompClient?.send 대신 publish 사용
    stompClient?.publish({
      destination: "/api/matching/pub/entry",
      body: JSON.stringify(requestDto),
    });

    console.log("메시지 전송:", requestDto);
  };

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.deactivate();
      console.log("연결 해제");
      setIsMatchingStatus(false); // 매칭 상태 해제
    }
  };

  return (
    <div className="w-full h-full ">
      <div
        className="w-full h-[30%] flex flex-col items-center justify-center"
        style={{
          background:
            "linear-gradient(1deg, #FEF8EC -2.21%, rgba(254, 251, 245, 0.53) 51.4%, rgba(255, 255, 255, 0) 99.05%)",
        }}
      >
        <CircleAvatar
          avatarIcon={true}
          number={userAvatar}
          emotion="normal"
          width={96}
        />

        <input
          type="text"
          id="nickname"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="number"
          id="rating"
          placeholder="레이팅 입력"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value ? parseInt(e.target.value) : 500)
          }
        />
      </div>
      <div className="w-full h-[70%] flex flex-col items-center gap-6">
        <UserNameContainer
          className="mt-4"
          nickname={nickname}
          rating={rating}
        />
        <TierProgressBar rating={rating} />
        <div className="w-full px-4">
          <Body1Text className="!text-left text-catch-main-400 ">
            2024 Autumn
          </Body1Text>
        </div>
        {!isMatchingStatus ? (
          <PrimaryButton
            showIcon={false}
            onClick={connect}
            size="small"
            color="main"
          >
            연결
          </PrimaryButton>
        ) : (
          <>
            <PrimaryButton
              showIcon={false}
              onClick={sendMessage}
              size="small"
              color="main"
            >
              메시지 전송
            </PrimaryButton>
            <PrimaryButton
              showIcon={false}
              onClick={disconnect}
              size="small"
              color="white"
            >
              연결 해제
            </PrimaryButton>
            <button onClick={goToGame}>게임으로 이동</button>
          </>
        )}
      </div>
      <NavBarBackground className="mt-3" />
    </div>
  );
};
