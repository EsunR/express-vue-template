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
  // Websocket
  {
    path: '/websocket',
    name: 'Websocket',
    component: () => import('@client/views/websocket/index.vue'),
    meta: {
      menuName: 'Websocket',
    },
  },
  // Krpano
  {
    path: '/krpano/upload',
    name: 'KrpanoUpload',
    component: () => import('@client/views/krpano/upload/index.vue'),
    meta: {
      belong: 'Krpano',
    },
  },
  {
    path: '/krpano/editor',
    name: 'KrpanoEditor',
    component: () => import('@client/views/krpano/editor/index.vue'),
    meta: {
      belong: 'Krpano',
    },
  },
  // 海报生成
  {
    path: '/poster/generate',
    name: 'PosterGenerate',
    component: () => import('@client/views/poster/generate/index.vue'),
    meta: {
      belong: '海报生成',
      menuName: '生成',
    },
  },
  {
    path: '/poster/generate/subPage',
    name: 'PosterGenerateSubPage',
    component: () => import('@client/views/poster/generate/subPage.vue'),
    meta: {
      hide: true,
      purePage: true,
    },
  },
  {
    path: '/poster/iframeMessage',
    name: 'PosterIframeMessage',
    component: () => import('@client/views/poster/iframeMessage/index.vue'),
    meta: {
      belong: '海报生成',
      menuName: 'iframe 通信测试',
    },
  },
  {
    path: '/poster/iframeMessage/subPage',
    name: 'PosterIframeMessageSubPage',
    component: () => import('@client/views/poster/iframeMessage/subPage.vue'),
    meta: {
      hide: true,
      purePage: true,
    },
  },
  {
    path: '/poster/pdfRender',
    name: 'PosterPdfRender',
    component: () => import('@client/views/poster/pdfRender/index.vue'),
    meta: {
      belong: '海报生成',
      menuName: '渲染 PDF',
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
