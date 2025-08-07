<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>
