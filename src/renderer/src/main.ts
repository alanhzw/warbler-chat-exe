import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// 组件库
import ElementPlus from 'element-plus';
// 使用中文包，防止有的组件显示英文
import zhCn from 'element-plus/es/locale/lang/zh-cn';

// 路由
import router from './router';

// reset css
import 'modern-normalize';
import '@/style/index.css';

// element-plus
import 'element-plus/theme-chalk/dark/css-vars.css';

// 全局状态管理
const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(ElementPlus, {
  locale: zhCn,
});
app.mount('#app');
