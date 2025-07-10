<template>
  <div class="home-page card-area">
    <h1 class="text-3xl mb-4">Welcome !</h1>
    <el-button type="success" @click="onSuccessBtnClick"
      >测试服务器正常</el-button
    >
    <el-button type="danger" @click="onErrorBtnClick">测试服务器报错</el-button>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'HomePage',
});
</script>

<script lang="ts" setup>
import { getTestError, getTestSuccess } from '@client/api/test';
import { AxiosError } from 'axios';
import { ElMessageBox } from 'element-plus';

async function onSuccessBtnClick() {
  const res = await getTestSuccess();
  ElMessageBox({
    title: '服务器响应',
    message: JSON.stringify(res.data),
  });
}

async function onErrorBtnClick() {
  try {
    await getTestError();
  } catch (error) {
    ElMessageBox({
      title: '服务器响应',
      message: JSON.stringify((error as AxiosError).response?.data),
    });
  }
}
</script>
