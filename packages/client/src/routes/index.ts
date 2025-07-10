import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'Home' },
    meta: {
      hide: true,
    },
  },
  // Home
  {
    path: '/home',
    name: 'Home',
    component: () => import('@client/views/home/index.vue'),
    meta: {
      menuName: '首页',
    },
  },
  // User
  {
    path: '/user/create',
    name: 'UserCreate',
    component: () => import('@client/views/user/create/index.vue'),
    meta: {
      belong: '用户管理',
      menuName: '创建用户',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
