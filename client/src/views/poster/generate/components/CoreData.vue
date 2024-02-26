<script lang="ts" setup>
import { CoreDataProps } from '../types';
import LineChart from './LineChart.vue';

defineOptions({
  name: 'CoreData',
});

withDefaults(defineProps<CoreDataProps>(), {
  displayField: () => [],
  dataSet: () => ({}),
});
</script>

<template>
  <div class="bg-sky-50 p-2">
    <div
      v-for="(item, index) in displayField"
      :key="index"
      class="mb-4 last:mb-0 bg-sky-200 p-4"
    >
      <template v-if="item === 'totalExposure'">
        <span>总曝光量</span>
        <span>{{ dataSet.totalExposure }}</span>
        <line-chart />
      </template>

      <template v-if="item === 'totalClick'">
        <span>总点击量</span>
        <span>{{ dataSet.totalClick }}</span>
        <line-chart />
      </template>

      <template v-if="item === 'totalVisitor'">
        <span>总访客量</span>
        <span>{{ dataSet.totalVisitor }}</span>
        <line-chart />
      </template>

      <template v-if="item === 'totalClue'">
        <span>总线索量</span>
        <span>{{ dataSet.totalClue }}</span>
        <line-chart />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
