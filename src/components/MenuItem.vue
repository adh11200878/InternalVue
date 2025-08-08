<template>
    <!-- 有子選單的群組項目 -->
    <v-list-group v-if="item.children.length > 0" v-model="isOpen" :prepend-icon="item.icon || 'mdi-chevron-down'"
        no-action>
        <!-- Activator：點一下就展開此群組 -->
        <template #activator="{ props }">
            <v-list-item v-bind="props">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </template>

        <!-- 遞迴渲染子選單 -->
        <!-- 加上 key，提升渲染效能 -->
        <MenuItem v-for="(child, index) in item.children" :key="index" :item="child" />
    </v-list-group>

    <!-- 沒有子選單的單一項目 -->
    <v-list-item v-else :to="item.to" :prepend-icon="item.icon">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
</template>

<script setup>
import { ref } from 'vue'

// ✅ 使用 defineProps 定義傳入的 item 物件
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

// ✅ 控制群組展開狀態
const isOpen = ref(false)
</script>
