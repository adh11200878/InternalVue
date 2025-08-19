<template>
  <h2>員工資料</h2>
  <!-- 查詢區塊 -->
  <div class="d-flex align-center mb-4" style="gap: 1rem">
    <v-text-field v-model="search.userName" label="姓名" />
    <v-text-field v-model="search.email" label="信箱" />
    <v-btn color="primary" @click="SelectData" prepend-icon="mdi-magnify"
      >查詢</v-btn
    >
  </div>

  <!-- 預設有排序功能 -->
  <v-data-table :headers="headers" :items="employees">
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.userName }}</td>
        <td>{{ item.email }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../utils/axiosUtils";
import type { UserModel, SearchUserModel } from "../models/UserModel";
//引用snackbar替代alert
import { useSnackbarStore } from "../stores/snackbar";
const snackbar = useSnackbarStore();
const employees = ref<UserModel[]>([]);
// 新增搜尋欄位綁定
const search = ref<SearchUserModel>({
  userName: "",
  email: "",
});
// 表頭欄位 (特定欄位不要排序可以給false 預設不給值就是true)
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

onMounted(() => {
  SelectData();
});
</script>

<style scoped></style>
