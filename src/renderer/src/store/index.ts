import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGlobalStore = defineStore('global', () => {
  // 全局 loading
  const loading = ref(false);
  return { loading };
});
