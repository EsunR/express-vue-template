import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    hide?: boolean;
    menuName?: string;
    belong?: string;
    // 是否是纯页面，不需要菜单
    purePage?: boolean;
  }
}
