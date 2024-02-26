<script lang="ts" setup>
import { ShopDataProps } from '../types';

defineOptions({
  name: 'ShopData',
});

withDefaults(defineProps<ShopDataProps>(), {
  displayField: () => [],
  dataSet: () => ({}),
});

const reportTime = computed(() => {
  return new Date().toLocaleString();
});
</script>

<template>
  <div class="bg-pink-50 p-2">
    <div class="flex mb-2">
      <div class="mr-4">{{ dataSet.shopName }}</div>
      <div>报告时间：{{ reportTime }}</div>
    </div>
    <div class="flex flex-wrap">
      <div v-for="(item, index) in displayField" :key="index" class="w-1/2">
        <template v-if="item === 'shopStar'">
          <span>店铺星级</span>
          <span>{{ dataSet.shopStar }}</span>
        </template>

        <template v-if="item === 'shopScore'">
          <span>综合评分</span>
          <span>{{ dataSet.shopScore }}</span>
        </template>

        <template v-if="item === 'productCount'">
          <span>商品数量</span>
          <span>{{ dataSet.productCount }}</span>
        </template>

        <template v-if="item === 'fiveStarProductCount'">
          <span>五星商品数量</span>
          <span>{{ dataSet.fiveStarProductCount }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
