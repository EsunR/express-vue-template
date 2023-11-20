<script lang="ts" setup>
import PanoViewer from '@client/components/PanoViewer/index.vue';
import axios from 'axios';

defineOptions({
  name: 'KrpanoEditorPage',
});

const xml = ref<string>('');
const xmlUrl = ref<string>(localStorage.getItem('krpanoEditor__xmlUrl') || '');
const xmlEditValue = ref<string>('');
const action = ref<string>('');
const panoViewerRef = ref<InstanceType<typeof PanoViewer>>();

const downloadXml = async () => {
  if (!xmlUrl.value.trim()) {
    return;
  }
  localStorage.setItem('krpanoEditor__xmlUrl', xmlUrl.value);
  try {
    const res = await axios.get(xmlUrl.value);
    if (res.data) {
      xmlEditValue.value = res.data;
    }
  } catch (e) {
    console.error(e);
  }
};

const previewXml = () => {
  xml.value = xmlEditValue.value;
};

const carryAction = () => {
  if (panoViewerRef.value?.panoInstance) {
    panoViewerRef.value.panoInstance.call(action.value);
  }
};
</script>

<template>
  <div class="krpano-editor-page">
    <div class="card-area">
      <h1 class="card-title">Editor</h1>
      <div class="mb-4 flex">
        <el-input v-model="xmlUrl" placeholder="XML 链接" class="mr-2" />
        <el-button @click="downloadXml">下载 XML</el-button>
      </div>
      <el-input
        v-model="xmlEditValue"
        :rows="15"
        type="textarea"
        placeholder="Please input"
        class="mb-4"
      />
      <el-button type="primary" @click="previewXml">预览</el-button>
    </div>
    <div class="card-area">
      <h1 class="card-title">Tour</h1>
      <div class="mb-4 flex">
        <el-input v-model="action" placeholder="Krpano action" class="mr-2" />
        <el-button @click="carryAction">执行 Action</el-button>
      </div>
      <pano-viewer
        ref="panoViewerRef"
        :xml="xml"
        :embedding-parameters="{
          basepath: 'https://waimao-static.cdn.bcebos.com/trade-test/vtour/',
        }"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
