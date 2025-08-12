// 引入 axios 套件用來發送 HTTP 請求
import axios from "axios";

// 引入 Pinia 的 loading 狀態管理 store
import { useLoadingStore } from "../stores/loading";

// 建立一個 axios 實例，設定基本的 API 路徑與逾時時間
const api = axios.create({
  baseURL: "http://localhost:5110/", // API 的根路徑
  timeout: 10000, // 請求逾時時間（毫秒）
});

// 設定請求攔截器：在每次發送請求前執行
api.interceptors.request.use(
  (config) => {
    const loading = useLoadingStore(); // 取得 loading store 實例
    loading.show(); // 顯示 loading 畫面
    return config; // 回傳請求設定
  },
  (error) => {
    const loading = useLoadingStore();
    loading.hide(); // 發送失敗時隱藏 loading
    return Promise.reject(error); // 拋出錯誤
  }
);

// 設定回應攔截器：在每次接收到回應後執行
api.interceptors.response.use(
  (response) => {
    const loading = useLoadingStore();
    loading.hide(); // 成功回應後隱藏 loading
    return response; // 回傳回應資料
  },
  (error) => {
    const loading = useLoadingStore();
    loading.hide(); // 回應錯誤時隱藏 loading
    return Promise.reject(error); // 拋出錯誤
  }
);

// 將設定好的 axios 實例匯出，供其他檔案使用
export default api;
