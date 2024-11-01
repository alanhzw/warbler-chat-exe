import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  // 初始化页面
  {
    path: '/',
    name: 'init-page',
    component: () => import(/* webpackChunkName: "init-page" */ '@v/init-page/index.vue'),
    children: [],
  },
  // 官方网站
  {
    path: '/official-website',
    name: 'official-website',
    component: () =>
      import(/* webpackChunkName: "official-website" */ '@v/official-website/index.vue'),
    children: [],
  },
  // 个人中心
  {
    path: '/personal-center',
    name: 'personal-center',
    component: () =>
      import(/* webpackChunkName: "personal-center" */ '@v/personal-center/index.vue'),
    children: [],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
