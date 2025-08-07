<template>
  <v-app-bar color="primary" flat>
    <v-app-bar-nav-icon @click="toggleDrawer" />
    <v-toolbar-title>我的網站</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>mdi-bell</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
const toggleDrawer = () => {
  console.log("Drawer toggled");
};
</script>
