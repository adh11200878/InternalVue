<template>
  <!-- 頁首工具列 -->
  <v-app-bar scroll-behavior="elevate" color="primary" flat app>
    <!-- 漢堡選單 -->
    <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen" />

    <!-- 網站標題 -->
    <router-link to="/" class="site-title-link">
      <v-toolbar-title>我的網站</v-toolbar-title>
    </router-link>

    <!-- 將右側按鈕推到最右邊 -->
    <v-spacer />

    <!-- 通知按鈕 -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-bell</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="goToProfile">
          <v-list-item-title>個人資料</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>登出</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- 帳號下拉選單 -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="goToProfile">
          <v-list-item-title>個人資料</v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>登出</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- 側邊選單 -->
  <v-navigation-drawer v-model="isDrawerOpen" app temporary :width="300">
    <v-list nav density="comfortable">
      <MenuItem v-for="(item, index) in menuItems" :key="item.id ?? index" :item="item" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MenuItem from "./MenuItem.vue";
import api from "../utils/axiosUtils";
import { authLogOut } from "../services/auth";
import { useRouter } from 'vue-router'
//引用snackbar替代alert
import { useSnackbarStore } from "../stores/snackbar";

const router = useRouter()
const isDrawerOpen = ref(false);
const menuItems = ref([]);

async function loadMenuItems() {
  try {
    const { data } = await api.get("http://localhost:5110/weatherforecast");
    menuItems.value = data;
  } catch (error) {
    console.error("菜單資料載入失敗：", error);
    alert("菜單載入失敗，請稍後再試。");
  }
}

function goToProfile() {
  console.log("前往個人資料頁");
}

//登出按鈕
async function logout() {
  const success = authLogOut(); // 執行登出邏輯
  if (success) {
    router.push('./login'); // 導向登入頁面
  } else {
    const snackbar = useSnackbarStore();
    snackbar.error("登出失敗");
  }
}

onMounted(() => {
  loadMenuItems();
});
</script>

<style scoped>
.site-title-link {
  margin-left: 2rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.site-title-link:hover {
  opacity: 0.5;
}
</style>
