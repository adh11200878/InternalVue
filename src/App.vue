<template>
  <router-view />

  <!-- 提示訊息 -->
  <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000" location="top right" elevation="10"
    rounded="lg" class="text-white">
    <div class="d-flex align-center justify-space-between w-100">
      <!-- 圖示與訊息 -->
      <div class="d-flex align-center">
        <v-icon class="mr-2 bounce-icon" :color="snackbar.iconColor" size="28">
          {{ snackbar.icon }}
        </v-icon>
        <span class="text-body-1 font-weight-medium">
          {{ snackbar.message }}
        </span>
      </div>
      <!-- 關閉按鈕 -->
      <v-btn icon variant="text" @click="snackbar.show = false">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </div>
  </v-snackbar>

  <!-- 全畫面 Loading Spinner -->
  <v-overlay :model-value="loadingStore.isLoading" persistent class="d-flex justify-center align-center">
    <div class="text-center">
      <v-progress-circular indeterminate size="96" color="primary" class="mb-4" />
      <div class="text-h6 font-weight-medium text-primary">載入中，請稍候...</div>
    </div>
  </v-overlay>


</template>

<script setup lang="ts">
import { useSnackbarStore } from "./stores/snackbar";
import { useLoadingStore } from './stores/loading';
const snackbar = useSnackbarStore();
const loadingStore = useLoadingStore();
</script>

<style scoped></style>
