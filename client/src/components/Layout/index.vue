<template>
  <div v-if="isPurePage">
    <slot></slot>
  </div>
  <div v-else class="flex flex-col h-100vh">
    <layout-header />
    <div class="flex flex-1 overflow-hidden">
      <layout-menu />
      <div class="p-5 flex-1 overflow-y-auto bg-light-600">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutHeader from './Header.vue';
import LayoutMenu from './Menu.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Layout',
  components: {
    LayoutHeader,
    LayoutMenu,
  },
  setup() {
    const route = useRoute();

    const isPurePage = computed(() => {
      return route.meta.purePage;
    });

    return {
      isPurePage,
    };
  },
});
</script>
