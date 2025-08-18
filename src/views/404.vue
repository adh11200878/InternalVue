<template>
  <v-container class="fill-height" fluid>
    <v-row :align="center" justify="center">
      <v-col cols="12" md="6" class="text-center">
        <v-icon size="100" color="error">mdi-alert-circle-outline</v-icon>
        <h1 class="display-1 mt-4">404</h1>
        <p class="subtitle-1">抱歉，你訪問的頁面不存在。</p>
        <v-btn color="primary" class="mt-4" @click="goHome"> 回首頁 </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
