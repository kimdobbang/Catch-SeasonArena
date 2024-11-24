import { Copyright } from "@widgets/index";
import { ServiceTitle } from "@ui/index";
export const NotPwaPage = () => {
  return (
    <div className="flex flex-col items-center justify-around h-screen bg-catch-sub-100">
      <div className="flex flex-col items-center">
        <ServiceTitle />
      </div>
      <div className="text-center font-pretendard text-title">
        PWA앱을 설치해주세요
      </div>
      <div>아이폰: 홈화면 추가</div>
      <div>갤럭시 아이폰: 홈화면 다운로드</div>

      <Copyright />
    </div>
  );
};
