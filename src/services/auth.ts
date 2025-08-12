import api from "../utils/axiosUtils";

//登入邏輯
export async function authLogin(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const response = await api.post("Auth/Login", {
      username,
      password,
    });
    if (response.data) {
      sessionStorage.setItem("token", response.data);
      return true;
    }
    return false;
  } catch (error) {
    console.error("登入失敗:", error);
    return false;
  }
}
