<script lang="ts" setup>
import html2canvas, { Options } from 'html2canvas';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

defineOptions({
  name: 'Html2CanvasCORSPage',
});

const IMAGE_CONFIG: Array<{
  title: string;
  src: string;
}> = [
  // {
  //   title: '当前域图片',
  //   src: new URL('@client/assets/images/mountain.webp', import.meta.url).href,
  // },
  // {
  //   title: '跨域图片',
  //   src: 'https://esunr-webapp.bj.bcebos.com/express-vue-template/playground/mountain.webp',
  // },
  {
    title: '跨域图片(使用 CDN)',
    src: 'https://esunr-webapp.cdn.bcebos.com/express-vue-template/playground/mountain.webp',
  },
];

const route = useRoute();
const show = ref(true);
const hasCorsAttr = ref(route.query.hasCorsAttr === 'true');
const renderAreaRef = ref<HTMLElement | null>(null);
const outputImgSrc = ref('');
const html2canvasOptions = reactive<Partial<Options>>({
  allowTaint: false,
  useCORS: true,
});

const freshKey = computed(() => route.query.freshKey as string | undefined);

const reloadRenderArea = () => {
  show.value = false;
  setTimeout(() => {
    show.value = true;
  }, 200);
};

const reloadPage = () => {
  window.location.reload();
};

const refreshCache = () => {
  window.location.href = `${
    window.location.href.split('?')[0]
  }?freshKey=${Date.now()}`;
};

const generate = () => {
  outputImgSrc.value = '';
  if (!renderAreaRef.value) {
    return;
  }

  html2canvas(renderAreaRef.value, {
    allowTaint: html2canvasOptions.allowTaint,
    useCORS: html2canvasOptions.useCORS,
    // onclone: (doc) => {
    //   const images = doc.querySelectorAll('img');
    //   images.forEach((img) => {
    //     const imgUrl = img.getAttribute('src');
    //     const newImageUrl = `${imgUrl}&timestamp=${new Date().valueOf()}`;

    //     const _img = new Image();
    //     _img.crossOrigin = 'anonymous';
    //     _img.src = newImageUrl;

    //     img.setAttribute('crossorigin', 'anonymous');
    //     img.setAttribute('src', newImageUrl);

    //     // const backgroundImageUrl = (
    //     //   img as HTMLDivElement
    //     // ).style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
    //     // const newImageUrl = `${backgroundImageUrl}&timestamp=${new Date().valueOf()}`;

    //     // const _img = new Image();
    //     // _img.crossOrigin = 'anonymous';
    //     // _img.src = newImageUrl;

    //     // (img as HTMLDivElement).style.backgroundImage = `url(${_img.src})`;
    //   });
    // },
  })
    .then((canvas) => {
      const img = canvas.toDataURL('image/png');
      outputImgSrc.value = img;
    })
    .catch((e) => {
      ElMessage.error('生成图片失败，查看控制台错误');
      console.error(e);
    });
};
</script>

<template>
  <div class="card-area">
    <h1 class="card-title">html2canvas 跨域测试</h1>
    <div>
      <el-button @click="reloadRenderArea">重新加载渲染区域</el-button>
      <el-button @click="reloadPage">刷新页面</el-button>
      <el-button @click="refreshCache">刷新缓存</el-button>
    </div>

    <div class="flex items-center">
      <span class="mr-2">为图片开启 crossorigin 属性</span>
      <el-switch v-model="hasCorsAttr" />
    </div>
    <div class="flex items-center">
      <span class="mr-2">allowTaint</span>
      <el-switch v-model="html2canvasOptions.allowTaint" />
    </div>
    <div class="flex items-center">
      <span class="mr-2">useCORS</span>
      <el-switch v-model="html2canvasOptions.useCORS" />
    </div>

    <div>
      <el-button type="primary" @click="generate">生成截图</el-button>
    </div>
  </div>

  <div v-if="show" ref="renderAreaRef" class="card-area">
    <el-row :gutter="10">
      <el-col v-for="(item, index) in IMAGE_CONFIG" :key="index" :span="12">
        <p>{{ item.title }}：</p>
        <img
          :crossorigin="hasCorsAttr ? 'anonymous' : undefined"
          :src="`${item.src}?freshKey=${freshKey}`"
        />
        <!-- <div
          class="img w-150 h-100 bg-pink-50"
          :style="{
            backgroundImage: `url(${item.src}?freshKey=${freshKey})`,
          }"
        ></div> -->
      </el-col>
    </el-row>
  </div>

  <div class="card-area">
    <h1 class="card-title">输出图片</h1>
    <img :src="outputImgSrc" />
  </div>
</template>
