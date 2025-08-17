import axios from "axios";
import { useLoadingStore } from "@/stores/loading";

// 建立 axios 實例
const api = axios.create({
  baseURL: "http://localhost:5110/",
  timeout: 10000, // 逾時時間 (毫秒)
});

// 請求攔截器
api.interceptors.request.use(
  (config) => {
    const loading = useLoadingStore();
    loading.show();
    // 加入 JWT Token
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const loading = useLoadingStore();
    loading.hide();
    return Promise.reject(error);
  }
);

// 回應攔截器
api.interceptors.response.use(
  (response) => {
    const loading = useLoadingStore();
    loading.hide();
    return response;
  },
  (error) => {
    const loading = useLoadingStore();
    loading.hide();
    // 取得回應與狀態碼
    const { response } = error;
    // === 錯誤處理 ===
    if (response) {
      // 有收到伺服器回應
      if (response.status === 401) {
        // JWT 無效或過期
        console.warn("未授權，請重新登入");
        // 清掉 token
        sessionStorage.removeItem("token");
        // 導向登入頁 (視情況改成 router.push)
        window.location.href = "/login";
      }
    } else {
      alert("連線異常！");
    }
    return Promise.reject(error);
  }
);

export default api;
