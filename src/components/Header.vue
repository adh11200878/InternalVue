<template>
  <!-- 頁首工具列 -->
  <v-app-bar scroll-behavior="elevate" color="primary" flat>
    <!-- 漢堡選單按鈕，控制抽屜開關 -->
    <v-app-bar-nav-icon @click="drawer = !drawer" />

    <!-- 網站標題 -->
    <router-link to="/" class="ml-8" style="text-decoration: none; color: inherit; cursor: pointer;">
      <v-toolbar-title>我的網站</v-toolbar-title>
    </router-link>

    <!-- 將右側按鈕推到最右邊 -->
    <v-spacer />

    <!-- 通知按鈕 -->
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>

    <!-- 帳號按鈕 -->
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- 側邊抽屜選單 temporary 表示點選外部會自動收合 預設寬度是256-->
  <v-navigation-drawer v-model="drawer" temporary :width="300">
    <v-list nav density="comfortable">
      <!-- 使用 MenuItem 元件遞迴渲染選單項目 -->
      <!-- 加上 key，提升渲染效能 -->
      <MenuItem v-for="(item, index) in menuItems" :key="index" :item="item" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MenuItem from "./MenuItem.vue";
import api from "../utils/axiosUtils";

// 控制抽屜開關狀態
const drawer = ref(false);

// 儲存選單資料
const menuItems = ref([]);

// 元件掛載時載入選單資料
onMounted(async () => {
  try {
    // const response = await fetch('/menu.json')
    // menuItems.value = await response.json()
    // axiosUtils 取得 API 資料
    const response = await api.get("http://localhost:5110/weatherforecast");
    // console.log('完整回應：', response)
    // console.log('回應資料：', response.data)
    // 將取得的資料指派給 menuItems
    menuItems.value = response.data;
  } catch (error) {
    // 錯誤處理，避免程式崩潰
    alert(`菜單抓取異常: ${error}`);
  }
});
</script>

<style scoped>
.v-toolbar-title:hover {
  opacity: 0.5;
}
</style>
