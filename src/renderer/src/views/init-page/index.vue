<template>
  <el-button type="primary"> As a directive </el-button>
  <div v-loading.fullscreen.lock="globalStore.loading" class="">init</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGlobalStore } from '@/store/index';

const globalStore = useGlobalStore();

onMounted(() => {
  globalStore.loading = true;
  window.api.test.test1((value) => {
    console.log('🚀🚀 ~ window.api.onUpdateCounter ~ test11:', value);
    globalStore.loading = false;
  });
});
</script>
