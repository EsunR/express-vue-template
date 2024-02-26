<script lang="ts" setup>
defineOptions({
  name: 'IframeMessageSubPage',
});

const iframeMessage = ref<any>('IframeMessageSubPage');

const onReceiveMessage = (event: MessageEvent) => {
  iframeMessage.value = event.data;
};

onMounted(() => {
  window.addEventListener('message', onReceiveMessage);
});

onUnmounted(() => {
  window.removeEventListener('message', onReceiveMessage);
});
</script>

<template>
  <div>{{ iframeMessage }}</div>
</template>

<style lang="scss" scoped></style>
