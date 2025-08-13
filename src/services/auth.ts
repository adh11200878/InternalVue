import api from "../utils/axiosUtils";
import type { LoginModel } from "../models/LoginModel";

//登入邏輯
export async function authLogin(loginData: LoginModel): Promise<boolean> {
  try {
    const response = await api.post("Auth/Login", loginData);
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
