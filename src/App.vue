<template>
  <router-view />

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

</template>

<script setup lang="ts">
import { useSnackbarStore } from "./stores/Snackbar";
const snackbar = useSnackbarStore();
</script>

<style scoped></style>
