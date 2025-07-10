<template>
  <div class="layout flex flex-col h-[100vh]">
    <layout-header />
    <div class="flex flex-1 overflow-hidden">
      <layout-menu />
      <div class="p-5 flex-1 overflow-y-auto bg-gray-100">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutHeader from './Header.vue';
import LayoutMenu from './Menu.vue';

export default defineComponent({
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutMenu,
  },
  setup() {
    return {};
  },
});
</script>
