<template>
  <div class="user-create-page">
    <el-form
      ref="elFormRef"
      label-width="60px"
      class="card-area"
      :model="formData"
    >
      <el-form-item label="用户名">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>

      <div class="flex justify-center">
        <el-button
          :loading="createLoading"
          type="primary"
          @click="onCreateBtnClick"
          >创建</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'UserCreatePage',
});
</script>

<script lang="ts" setup>
import { createUser } from '@client/api/user';
import { ElMessage } from 'element-plus';

const elFormRef = ref<any>();
const formData = reactive({
  name: '',
  password: '',
});
const createLoading = ref(false);

async function onCreateBtnClick() {
  elFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      try {
        createLoading.value = true;
        const res = await createUser(formData);
        ElMessage.success(`创建成功，新用户: ${res.data.name}`);
      } finally {
        createLoading.value = false;
      }
    }
  });
}
</script>
