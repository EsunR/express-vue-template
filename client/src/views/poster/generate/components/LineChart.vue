<script lang="ts" setup>
import VChart from 'vue-echarts';
import { EChartsOption } from 'echarts';
import { LineChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { GridComponent } from 'echarts/components';
import { use } from 'echarts/core';

use([LineChart, CanvasRenderer, GridComponent]);

defineOptions({
  name: 'LineChart',
});

const options = computed(() => {
  return {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    grid: {
      left: '0',
      right: '0',
      bottom: '0px',
      top: '20px',
      containLabel: true,
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
      },
    ],
    backgroundColor: 'rgb(255, 255, 255)',
  } as EChartsOption;
});
</script>

<template>
  <v-chart :option="options" class="h-50" />
</template>

<style lang="scss" scoped></style>
