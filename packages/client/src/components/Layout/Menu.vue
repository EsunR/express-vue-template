<template>
  <el-menu
    class="w-65 bg-white flex-shrink-0 border-r"
    router
    :default-active="route.fullPath"
  >
    <template v-for="routeItem in navConfig" :key="routeItem.path">
      <!-- 菜单项 -->
      <el-menu-item
        v-if="!routeItem.children && !routeItem.meta?.hide"
        :index="routeItem.path"
      >
        {{ routeItem.meta?.menuName ?? routeItem.name }}
      </el-menu-item>
      <!-- 菜单项 -->

      <!-- 折叠菜单项 -->
      <el-sub-menu
        v-if="routeItem.children && !routeItem.meta?.hide"
        :index="routeItem.path"
      >
        <template #title>
          {{ routeItem.meta?.menuName ?? routeItem.name }}
        </template>
        <template
          v-for="childRouteItem in routeItem.children"
          :key="childRouteItem.path"
        >
          <el-menu-item
            v-if="!childRouteItem.meta?.hide"
            :index="routeItem.path + '/' + childRouteItem.path"
          >
            {{ childRouteItem.meta?.menuName ?? childRouteItem.name }}
          </el-menu-item>
        </template>
      </el-sub-menu>
      <!-- 折叠菜单项 -->
    </template>
  </el-menu>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouteRecordRaw, useRoute } from 'vue-router';
import { cloneDeep } from 'lodash-es';
import { routes } from '@client/routes';

export default defineComponent({
  name: 'LayoutMenu',
  setup() {
    const route = useRoute();

    const navConfig = computed(() => {
      const result: RouteRecordRaw[] = [];
      const cpRoutes = cloneDeep(routes);
      cpRoutes.forEach((item) => {
        const belong = item.meta?.belong;
        if (belong) {
          const belongTarget = result.find((_item) => _item.name === belong);
          const basePath = ('/' + item.path.split('/')[1]) as string;
          item.path = item.path.replace(basePath + '/', '');
          if (belongTarget) {
            belongTarget.children?.push(item);
          } else {
            const newRouteItem: RouteRecordRaw = {
              path: basePath,
              name: belong,
              redirect: item.path,
              children: [],
            };
            newRouteItem.children?.push(item);
            result.push(newRouteItem);
          }
        } else {
          result.push(item);
        }
      });
      return result;
    });

    return {
      route,
      navConfig,
    };
  },
});
</script>
