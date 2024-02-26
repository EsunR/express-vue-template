<script lang="ts" setup>
import request from '@client/utils/request';
import ControllerForm from './components/ControllerForm.vue';
import { MOCK_SHOP_DATA } from './config';
import { ControllerFormData } from './types';
import { generateSchema } from './utils';
import { copyToClipboard } from '@client/utils';
import { ElMessage } from 'element-plus';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import fontPath from '@client/assets/fonts/SourceHanSansCN-VF.ttf';

defineOptions({
  name: 'PosterGeneratePage',
});

const iframeSrc = window.location.origin + '/#/poster/generate/subPage';

const dataSet = ref<typeof MOCK_SHOP_DATA | undefined>();
const iframeRef = ref<HTMLIFrameElement | null>(null);
const controllerFormRef = ref<InstanceType<typeof ControllerForm> | null>(null);
const loading = ref(false);

/**
 * 向 iframe 通信
 */
const postMessage2Iframe = (message: any) => {
  if (iframeRef.value) {
    iframeRef.value.contentWindow?.postMessage(
      {
        source: 'posterGeneratePage',
        payload: JSON.parse(JSON.stringify(message)),
      },
      iframeSrc
    );
  }
};

/**
 * 将渲染 Schema 同步到 iframe
 */
const syncSchema2Iframe = (data?: ControllerFormData) => {
  if (dataSet.value) {
    const schema = generateSchema(
      dataSet.value,
      data || (controllerFormRef.value?.formData ?? {})
    );
    postMessage2Iframe(schema);
  }
};

const fetchShopData = (): Promise<typeof MOCK_SHOP_DATA> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_SHOP_DATA);
    }, 0);
  });
};

const onGenerateImage = () => {
  const iframeBody = iframeRef.value?.contentDocument?.body;
  if (iframeBody) {
    html2canvas(iframeBody).then((canvas) => {
      // create link
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = 'poster.png';
      a.click();
    });
  }
};

const onGeneratePdf = async (
  formData: ControllerFormData,
  type: 'image' | 'html'
) => {
  const iframeBody = iframeRef.value?.contentDocument?.body;
  if (iframeBody) {
    // Solution1：图片方式生成 PDF
    if (type === 'image') {
      html2canvas(iframeBody).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf({
          orientation: 'p',
          unit: 'mm',
          format: 'a4',
        });
        const imgProps = pdf.getImageProperties(imgData);
        // 获取 pdf 单页宽高
        const pdfPageWidth = pdf.internal.pageSize.getWidth();
        const pdfPageHeight = pdf.internal.pageSize.getHeight();
        // 将图片宽高按照 pdf 宽度进行等比缩放
        const imageResizeWidth = pdfPageWidth;
        const imageResizeHeight =
          (imgProps.height * pdfPageWidth) / imgProps.width;
        // 处理如果图片高度超出一页的情况
        if (imageResizeHeight > pdfPageHeight) {
          let position = 0;
          while (true) {
            pdf.addImage(
              imgData,
              'PNG',
              0,
              position,
              imageResizeWidth,
              imageResizeHeight
            );
            position -= pdfPageHeight;
            if (Math.abs(position) < imageResizeHeight) {
              pdf.addPage();
            } else {
              break;
            }
          }
        } else {
          pdf.addImage(
            imgData,
            'PNG',
            0,
            0,
            imageResizeWidth,
            imageResizeHeight
          );
        }
        pdf.save('poster.pdf');
      });
    }

    // Solution2：html 方式生成 PDF
    if (type === 'html') {
      const pdf = new jspdf({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });
      loading.value = true;
      const style = iframeBody.ownerDocument.createElement('style');
      // eslint-disable-next-line quotes
      style.innerHTML = "* { font-family: 'SourceHanSansCN-VF'; }";
      iframeBody.appendChild(style);
      pdf.html(iframeBody, {
        fontFaces: [
          {
            family: 'SourceHanSansCN-VF',
            src: [
              {
                url: fontPath,
                format: 'truetype',
              },
            ],
          },
        ],
        width: pdf.internal.pageSize.getWidth(),
        windowWidth: iframeBody.clientWidth,
        callback: () => {
          style.remove();
          loading.value = false;
          // pdf.save('posterHtml.pdf');
          pdf.output('pdfobjectnewwindow');
        },
      });
    }
  }
};

const onGenerateLink = async (data: ControllerFormData) => {
  if (dataSet.value) {
    const schema = generateSchema(dataSet.value, data);
    postMessage2Iframe(schema);
    const res = await request.post('/poster/create', { schema });
    if (res.data.id) {
      const link =
        window.location.origin + '/#/poster/generate/subPage?id=' + res.data.id;
      copyToClipboard(link);
      ElMessage.success('复制成功');
    }
  }
};

const onReceiveMessage = (event: MessageEvent) => {
  if (event.data?.source === 'posterGenerateSubPage') {
    if (event.data.payload === 'ready') {
      syncSchema2Iframe();
    }
  }
};

onMounted(async () => {
  window.addEventListener('message', onReceiveMessage);
  dataSet.value = await fetchShopData();
  syncSchema2Iframe();
});

onUnmounted(() => {
  window.removeEventListener('message', onReceiveMessage);
});
</script>

<template>
  <div class="card-area flex">
    <div class="flex-1 mr-4">
      <controller-form
        ref="controllerFormRef"
        :loading="loading"
        @change="syncSchema2Iframe"
        @generate-image="onGenerateImage"
        @generate-pdf="onGeneratePdf"
        @generate-link="onGenerateLink"
      />
    </div>
    <div class="w-130 h-200 border">
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
