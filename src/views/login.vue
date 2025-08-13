<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="10" class="pa-6 rounded-lg">
          <v-card-title class="text-h5 text-center mb-4">
            <v-icon icon="mdi-account-circle" size="48" color="primary" class="mb-2" />
            <div>歡迎登入</div>
          </v-card-title>
          <v-card-text>
            <v-text-field v-model="username" label="帳號" prepend-icon="mdi-account" variant="outlined" class="mb-4" />
            <v-text-field v-model="password" label="密碼" type="password" prepend-icon="mdi-lock" variant="outlined"
              class="mb-4" @keyup.enter="login" />
            <v-btn @click="login" color="primary" size="large" block rounded class="mb-2">
              登入
            </v-btn>
            <v-alert v-if="errorMessage" type="error" variant="tonal" class="mt-4">
              {{ errorMessage }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authLogin } from "../services/auth";
import type { LoginModel } from "../models/LoginModel";

const username = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const login = async () => {
  //傳入值
  const loginData: LoginModel = {
    username: username.value,
    password: password.value,
  };
  errorMessage.value = "";
  const success = await authLogin(loginData);
  if (success) {
    router.push("/content");
  } else {
    errorMessage.value = "帳號或密碼錯誤，請再試一次。";
  }
};
</script>

<style scoped></style>
