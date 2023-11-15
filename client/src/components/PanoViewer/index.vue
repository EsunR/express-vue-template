<script lang="ts" setup>
defineOptions({
  name: 'PanoViewer',
});

const props = withDefaults(
  defineProps<{
    xml: string;
  }>(),
  {}
);

const panoContainerRef = ref<HTMLDivElement>();
const loadStatus = ref<'loading' | 'success' | 'fail'>('loading');
const panoInstance = ref<any>();

const loadPanoScript = () => {
  return new Promise((resolve, reject) => {
    const isPanoScriptExist = typeof embedpano === 'function';
    if (isPanoScriptExist) {
      return;
    }
    loadStatus.value = 'loading';
    const script = document.createElement('script');
    script.src = 'tour.js';
    document.body.appendChild(script);
    script.onload = () => {
      loadStatus.value = 'success';
      resolve(void 0);
    };
    script.onerror = () => {
      loadStatus.value = 'fail';
      reject(new Error('load pano script error'));
    };
  });
};

const initPano = async () => {
  await loadPanoScript();
  embedpano({
    xml: null,
    target: panoContainerRef.value,
    onready: (pano: any) => {
      panoInstance.value = pano;
    },
  });
};

const loadPanoXml = () => {
  if (panoInstance.value) {
    panoInstance.value.call(`loadxml(${props.xml}, null, MERGE, BLEND(1))`);
  }
};

onMounted(() => {
  initPano();
});

watch(
  [() => props.xml, loadStatus],
  () => {
    if (loadStatus.value && props.xml) {
      loadPanoXml();
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div class="pano-viewer">
    <div ref="panoContainerRef" class="pano-container"></div>
  </div>
</template>

<style lang="scss" scoped>
.pano-viewer {
  .pano-container {
    height: 600px;
  }
}
</style>
