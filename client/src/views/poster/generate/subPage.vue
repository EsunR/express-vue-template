<script lang="ts" setup>
import { PosterSchema } from './types';
import ShopData from './components/ShopData.vue';
import CoreData from './components/CoreData.vue';
import AdBanner from './components/AdBanner.vue';
import { useRoute } from 'vue-router';
import request from '@client/utils/request';

defineOptions({
  name: 'PosterGenerateSubPage',
  components: {
    ShopData,
    CoreData,
    AdBanner,
  },
});

const route = useRoute();

const renderSchema = ref<PosterSchema>([]);

const postMessage2Parent = (message: any) => {
  if (window.parent) {
    window.parent.postMessage(
      {
        source: 'posterGenerateSubPage',
        payload: JSON.parse(JSON.stringify(message)),
      },
      '*'
    );
  }
};

const onReceiveMessage = (event: MessageEvent) => {
  if (event.data?.source === 'posterGeneratePage') {
    renderSchema.value = event.data.payload;
  }
};

const loadSchema = async () => {
  if (route.query.id) {
    const res = await request.get('/poster/find', {
      params: {
        id: route.query.id,
      },
    });
    if (res.data.schema) {
      renderSchema.value = res.data.schema;
    }
  }
};

onMounted(() => {
  loadSchema();
  window.addEventListener('message', onReceiveMessage);
  postMessage2Parent('ready');
});

onUnmounted(() => {
  window.removeEventListener('message', onReceiveMessage);
});
</script>

<template>
  <div class="sub-page">
    <div
      class="bg-red-500 text-light-50 h-30 flex flex-col items-center justify-center"
    >
      <div class="text-3xl">会员数据效果报告</div>
      <div class="border-t border-light-50 mt-2 pt-2">
        MEMBER DATA PERFORMANCE REPORT
      </div>
    </div>
    <component
      :is="item.name"
      v-for="item in renderSchema"
      :key="item.name"
      v-bind="item.props"
    ></component>
  </div>
</template>
