<script lang="ts" setup>
defineOptions({
  name: 'IframeMessagePage',
});

const iframeSrc = window.location.origin + '/#/poster/iframeMessage/subPage';

const iframeRef = ref<HTMLIFrameElement | null>(null);

const postMessage = () => {
  if (iframeRef.value) {
    iframeRef.value.contentWindow?.postMessage(
      { message: 'some message' },
      iframeSrc
    );
  }
};
</script>

<template>
  <div class="card-area flex">
    <div class="w-120">
      <el-button @click="postMessage">Post Message</el-button>
    </div>
    <div class="flex-1 border">
      <iframe
        ref="iframeRef"
        :src="iframeSrc"
        frameborder="0"
        class="w-full h-full"
      ></iframe>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
