import config from "@/config";

export const checkNickNameExists = async (
  nickname: string,
): Promise<boolean> => {
  const response = await fetch(
    `${config.API_BASE_URL}/api/auth/members/nickname/${encodeURIComponent(nickname)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  console.log(response.ok);
  if (response.ok) {
    return true;
  } else if (response.status === 400) {
    return false;
  } else {
    throw new Error(`서버 오류: ${response.statusText}`);
  }
};
