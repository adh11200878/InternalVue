import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  actions: {
    async login(username: string, password: string): Promise<boolean> {
      // 模擬 API 呼叫
      if (username === "admin" && password === "1234") {
        // ✅ 儲存模擬 token 到 localStorage
        sessionStorage.setItem("token", "mock-token-123456");
        return true;
      }
      return false;
    },
  },
});
