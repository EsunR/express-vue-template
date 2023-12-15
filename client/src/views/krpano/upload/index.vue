<script lang="ts" setup>
import axios from 'axios';
import { AxiosError } from 'axios';
import { UploadUserFile, UploadProps, ElMessage } from 'element-plus';
import PanoViewer from '@client/components/PanoViewer/index.vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'KrpanoUploadPage',
});

const route = useRoute();
const router = useRouter();
const fileList = ref<UploadUserFile[]>([]);
const uploadedPanoId = ref<string>((route.query.panoId || '') as string);
const xmlData = ref<string>('');

const handleSuccess: UploadProps['onSuccess'] = (res) => {
  const resData = res?.data || {};
  uploadedPanoId.value = resData.panoId;
  router.push({
    query: {
      panoId: resData.panoId,
    },
  });
};

const fetchXML = async () => {
  try {
    const res = await axios.get(`/api/krpano/xml/${uploadedPanoId.value}`);
    xmlData.value = res.data;
  } catch (e) {
    const resData = (e as AxiosError).response?.data as any;
    if (resData.msg) {
      ElMessage.error(resData.msg);
    }
  }
};

const onPanoReady = () => {
  if (uploadedPanoId.value) {
    fetchXML();
  }
};
</script>

<template>
  <div class="krpano-upload-page">
    <div class="card-area">
      <h1 class="card-title">Upload</h1>
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        action="/api/krpano/upload"
        multiple
        :limit="3"
        @success="handleSuccess"
      >
        <el-button type="primary">Click to upload</el-button>
      </el-upload>
    </div>

    <div class="card-area">
      <h1 class="card-title">Preview</h1>
      <el-input v-model="uploadedPanoId" class="mb-4" placeholder="PanoId" />
      <el-button
        class="mb-4"
        :disabled="!uploadedPanoId.trim()"
        type="primary"
        @click="fetchXML"
        >获取 XML</el-button
      >
      <pano-viewer :xml="xmlData" @ready="onPanoReady" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
