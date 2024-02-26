<script lang="ts" setup>
import { AdBannerProps } from '../types';

defineOptions({
  name: 'AdBanner',
});

withDefaults(defineProps<AdBannerProps>(), {
  display: false,
  dataSet: () => [],
});
</script>

<template>
  <div v-if="display && dataSet.length" class="bg-purple-50 p-2">
    <div
      v-for="(item, index) in dataSet"
      :key="index"
      class="bg-purple-200 mb-2 flex items-center"
    >
      <span class="bg-purple-500 mr-3 text-white p-4 block">
        {{ item.title }}
      </span>
      <a target="_blank" class="block" :href="item.link">{{ item.link }}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
