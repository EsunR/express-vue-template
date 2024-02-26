<script lang="ts" setup>
import { ElForm } from 'element-plus';
import { ControllerFormData } from '../types';

defineOptions({
  name: 'ControllerForm',
});

withDefaults(defineProps<{ loading: boolean }>(), { loading: false });

const emit = defineEmits<{
  (e: 'change', data: ControllerFormData): void;
  (e: 'generateImage', data: ControllerFormData): void;
  (e: 'generatePdf', data: ControllerFormData, type: 'image' | 'html'): void;
  (e: 'generateLink', data: ControllerFormData): void;
}>();

const formRef = ref<InstanceType<typeof ElForm> | null>(null);

const formData = reactive<ControllerFormData>({
  coreData: ['totalClick', 'totalClue', 'totalExposure', 'totalVisitor'],
  shopData: ['fiveStarProductCount', 'productCount', 'shopScore', 'shopStar'],
  adData: true,
});

const generateImage = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      emit('generateImage', formData);
    }
  });
};

const generatePdf = (type: 'image' | 'html') => {
  formRef.value?.validate((valid) => {
    if (valid) {
      emit('generatePdf', formData, type);
    }
  });
};

const generateLink = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      emit('generateLink', formData);
    }
  });
};

watch(
  () => formData,
  (newVal) => {
    emit('change', newVal);
  },
  { deep: true }
);

defineExpose({
  formData,
});
</script>

<template>
  <el-form ref="formRef" :model="formData" label-position="top">
    <el-form-item label="核心指标">
      <el-checkbox-group v-model="formData.coreData">
        <el-checkbox label="totalExposure">总曝光量</el-checkbox>
        <el-checkbox label="totalClick">总点击量</el-checkbox>
        <el-checkbox label="totalVisitor">总访客量</el-checkbox>
        <el-checkbox label="totalClue">总线索量</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="店铺数据">
      <el-checkbox-group v-model="formData.shopData">
        <el-checkbox label="shopStar">店铺星级</el-checkbox>
        <el-checkbox label="shopScore">店铺评分</el-checkbox>
        <el-checkbox label="productCount">商品总量</el-checkbox>
        <el-checkbox label="fiveStarProductCount">五星商品量</el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="运营位">
      <el-select v-model="formData.adData" placeholder="Select">
        <el-option label="展示" :value="true" />
        <el-option label="隐藏" :value="false" />
      </el-select>
    </el-form-item>

    <div class="border-t mt-4 pt-4">
      <div class="mb-2">
        <el-button :loading="loading" @click="generateImage">
          生成图片
        </el-button>
        <el-button :loading="loading" @click="generateLink">
          生成共享链接
        </el-button>
      </div>
      <div>
        <el-button-group>
          <el-button :loading="loading" @click="generatePdf('image')">
            生成 PDF (Image)
          </el-button>
          <el-button :loading="loading" @click="generatePdf('html')">
            生成 PDF (HTML)
          </el-button>
          <!-- <el-button :loading="loading" @click="generatePdf('html')">
            生成 PDF (Server)
          </el-button> -->
        </el-button-group>
      </div>
    </div>
  </el-form>
</template>

<style lang="scss" scoped></style>
