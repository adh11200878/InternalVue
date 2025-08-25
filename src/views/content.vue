<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">👨‍💼 員工資料管理</h2>

    <!-- 查詢區塊 (卡片化) -->
    <v-card class="mb-6 rounded-xl shadow-md">
      <v-card-title class="text-lg font-semibold"> 🔍 查詢員工 </v-card-title>
      <v-card-text>
        <div class="d-flex align-center flex-wrap" style="gap: 1rem">
          <v-text-field
            v-model="search.userName"
            label="姓名"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-account"
          />
          <v-text-field
            v-model="search.email"
            label="信箱"
            variant="outlined"
            density="comfortable"
            prepend-inner-icon="mdi-email"
          />
          <v-btn
            color="primary"
            @click="SelectData"
            prepend-icon="mdi-magnify"
            class="rounded-lg"
          >
            查詢
          </v-btn>
          <v-btn
            color="secondary"
            @click="resetSearch"
            prepend-icon="mdi-refresh"
            class="rounded-lg"
          >
            重置
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- 資料表格 (卡片化 + hover 效果) -->
    <v-card class="rounded-xl shadow-md">
      <v-data-table
        :headers="headers"
        :items="employees"
        class="elevation-1"
        hover
        density="comfortable"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.userName }}</td>
            <td>{{ item.email }}</td>
          </tr>
        </template>
        <template v-slot:no-data>
          <v-alert type="info" border="start" elevation="2" class="my-4">
            尚無資料，請嘗試修改查詢條件。
          </v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../utils/axiosUtils";
import type { UserModel, SearchUserModel } from "../models/UserModel";
import { useSnackbarStore } from "../stores/snackbar";

const snackbar = useSnackbarStore();
const employees = ref<UserModel[]>([]);

const search = ref<SearchUserModel>({
  userName: "",
  email: "",
});

const headers = [
  { key: "userName", title: "姓名" },
  { key: "email", title: "信箱", sortable: true },
];

const SelectData = async () => {
  try {
    const response = await api.post("/User/GetBySearch", search.value);
    employees.value = response.data;
  } catch (err) {
    snackbar.warning("搜尋異常");
  }
};

const resetSearch = () => {
  search.value = { userName: "", email: "" };
  SelectData();
};

onMounted(() => {
  SelectData();
});
</script>

<style scoped></style>
