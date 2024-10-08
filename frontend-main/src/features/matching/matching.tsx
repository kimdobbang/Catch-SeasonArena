import config from "@/config";
import { useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { Body1Text, Caption2Text, PrimaryButton } from "@atoms/index";
import {
  TierProgressBar,
  UserNameContainer,
  CircleAvatar,
  EquippedItems,
} from "@entities/index";
import { NavBarBackground } from "@ui/index";

export const Matching = () => {
  const [isMatchingStatus, setIsMatchingStatus] = useState(false); // 매칭 상태 관리(연결누르면 true)
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP 클라이언트 상태
  const [roomcode, setRoomcode] = useState("");

  const { nickname, rating, email, selectedAvatar, equipment } = useSelector(
    (state: RootState) => state.user,
  );

  const goToGame = () => {
    window.location.href = `/game?nickname=${nickname}&email=${email}&rating=${rating}&roomcode=${roomcode}`;
  };

  const connectAndSendMessage = () => {
    const socket = new SockJS(`${config.API_BASE_URL}/api/matching`);

    // STOMP 클라이언트 생성
    const client = new Client({
      webSocketFactory: () => socket, // SockJS WebSocket을 사용하여 연결
      debug: (str) => {
        console.log(`STOMP debug: ${str}`);
      },
      heartbeatIncoming: 0, // Heartbeat 설정을 0으로 하여 서버의 Heartbeat 설정을 무시
    });

    client.onConnect = (frame) => {
      console.log("연결 성공", frame); // frame 정보 출력
      setStompClient(client); // 클라이언트 저장
      setIsMatchingStatus(true); // 매칭 상태로 변경

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

      // 연결 성공 후 메시지 전송
      sendMessage(client);
    };

    client.onStompError = (frame) => {
      console.error("STOMP 오류:", frame.headers["message"]);
      console.error("상세 내용:", frame.body);
    };

    client.onWebSocketError = (error) => {
      console.error("WebSocket 오류:", error);
    };

    client.activate(); // WebSocket 연결 활성화
  };

  // itemId가 있는 것만 필터링하여 배열에 추가
  const sendMessage = (client: Client) => {
    const equipmentArr = [equipment.weapon, equipment.active, equipment.passive]
      .filter((item) => item?.itemId) // itemId가 있는 것만 필터링하여 배열에 추가
      .map((item) => item.itemId);

    const requestDto = {
      nickname: nickname,
      rating: rating,
      items: equipmentArr,
      avatar: selectedAvatar.toString(),
    };

    // 서버에 매칭 요청 메시지 보내기
    client.publish({
      destination: "/api/matching/pub/entry",
      body: JSON.stringify(requestDto),
    });

    console.log("메시지 전송:", requestDto);
  };

  const disconnect = () => {
    if (stompClient !== null) {
      stompClient.deactivate();
      console.log("연결 해제");
      setIsMatchingStatus(false); // 룸코드 받기 전에만 활성화 매칭대기열 대기상태 해제
    }
  };

  return (
    <div className="w-full h-full ">
      {/* 유저 아바타*/}
      <div className="w-full h-[20%] flex flex-col items-center justify-center">
        <CircleAvatar
          avatarIcon={true}
          number={selectedAvatar}
          emotion="normal"
          width={96}
        />
      </div>
      {/* 유저 정보, 프로그레스바, 장착 무기*/}
      <div className="w-full h-[35%] flex flex-col items-center gap-6">
        <UserNameContainer className="mt-4" />
        <TierProgressBar />
        <EquippedItems showCaption={true} />
      </div>
      {/* 게임 버튼들 */}
      <div className="w-full h-[20%] gap-3 flex flex-col items-center">
        <div className="w-full px-4">
          <Body1Text className=" text-catch-main-400">2024 Autumn</Body1Text>
        </div>
        <div className="flex items-center justify-center">
          {!isMatchingStatus ? (
            // 매칭시작 누르기 전
            <div>
              <PrimaryButton
                showIcon={true}
                onClick={connectAndSendMessage} // 매칭 시작과 메시지 전송 동시 수행
                size="small"
                color="main"
              >
                매칭시작
              </PrimaryButton>
              <Caption2Text className="text-catch-gray-300">
                배틀에 사용할 장착 수집물을 확인하세요
              </Caption2Text>
            </div>
          ) : (
            // 매칭 시작 버튼 누른 후
            <div className="flex flex-col gap-1">
              <PrimaryButton
                showIcon={false}
                onClick={disconnect}
                size="small"
                color="white"
              >
                연결 해제
              </PrimaryButton>
              <button onClick={goToGame}>게임으로 이동</button>
            </div>
          )}
        </div>
      </div>
      <NavBarBackground className="mt-3 " />
    </div>
  );
};
