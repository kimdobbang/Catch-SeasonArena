// src/app/types/error.ts
// 인터페이스는 컴파일되면 자바스크립트에서 사라지기 때문에 err instanceof CusomError 가 불가능하게 된다. 그래서 컴파일되도 남아있는 클래스를 타입으로 이용하는 방법 씀
export class CustomError extends Error {
  response?: {
    data: object;
    status: number;
    headers: string;
  };

  constructor(
    message: string,
    response?: { data: object; status: number; headers: string },
  ) {
    super(message); // 부모 클래스의 생성자 호출
    this.name = "CustomError"; // 에러 이름 설정
    this.response = response;
  }
}
