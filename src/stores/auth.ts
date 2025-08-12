// src/stores/user.ts
import { defineStore } from "pinia";
import api from "../utils/axiosUtils";

export const useUserStore = defineStore("user", {
  actions: {
    async login(username: string, password: string): Promise<boolean> {
      try {
        const response = await api.post("Auth/Login", {
          username,
          password,
        });
        console.log(response.data);
        // 假設後端回傳的 token 在 response.data.token
        if (response.data) {
          sessionStorage.setItem("token", response.data);
          return true;
        }
        return false;
      } catch (error) {
        console.error("登入失敗:", error);
        return false;
      }
    },
  },
});
