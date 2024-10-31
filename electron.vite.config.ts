import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    publicDir: resolve('resources'),
    envDir: resolve('build'),
    envPrefix: 'RENDERER_',
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '@assets': resolve('src/renderer/src/assets'),
        '@api': resolve('src/renderer/src/api'),
        '@com': resolve('src/renderer/src/components'),
        '@v': resolve('src/renderer/src/views'),
        '@utils': resolve('src/renderer/src/utils'),
        '@hooks': resolve('src/renderer/src/hooks'),
        '@types': resolve('src/renderer/src/types'),
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});
