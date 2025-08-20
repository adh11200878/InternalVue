<template>
  <v-container class="pa-4" max-width="500">
    <v-card>
      <v-card-title class="text-h5">新增使用者</v-card-title>
      <v-card-text>
        <!-- 檔案上傳 -->
        <v-file-input
          label="選擇檔案"
          prepend-icon="mdi-file-upload"
          @change="onFileChange"
          outlined
          dense
          :show-size="true"
        />

        <!-- 使用者名稱 -->
        <v-text-field
          v-model="form.userName"
          label="使用者名稱"
          outlined
          dense
          class="mt-3"
        />

        <!-- 密碼 -->
        <v-text-field
          v-model="form.passWord"
          label="密碼"
          type="password"
          outlined
          dense
          class="mt-3"
        />

        <!-- Email -->
        <v-text-field
          v-model="form.email"
          label="Email"
          outlined
          dense
          class="mt-3"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submitForm">送出</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import api from "../utils/axiosUtils";

// 單一檔案
const file = ref<File | null>(null);

// 表單資料
const form = reactive({
  userName: "",
  passWord: "",
  email: "",
});

// 檔案變動事件
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    file.value = target.files[0];
  }
};

// 提交表單
const submitForm = async () => {
  if (!file.value) {
    alert("請選擇檔案");
    return;
  }
  const formData = new FormData();
  console.log(new Date().toISOString());
  formData.append("UserName", form.userName);
  formData.append("PassWord", form.passWord);
  formData.append("Email", form.email);
  formData.append("File", file.value);
  formData.append("CreatedAt", new Date().toISOString());
  try {
    const response = await api.post("User/Create", formData);
    console.log("上傳成功", response.data);
  } catch (err: any) {
    console.error("上傳失敗", err.response?.data || err.message);
  }
};
</script>
