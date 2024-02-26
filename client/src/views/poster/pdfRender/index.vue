<script lang="ts" setup>
import fontPath from '@client/assets/fonts/SourceHanSansCN-VF.ttf';
import jspdf from 'jspdf';

defineOptions({
  name: 'PdfRender',
});

const divRef = ref<HTMLDivElement | null>(null);
const useCustomFont = ref(true);

const generatePdf = async () => {
  const pdf = new jspdf({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });
  const fontRes = await fetch(fontPath);
  const fontBase64String = await fontRes.blob().then((blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  });
  pdf.addFileToVFS(
    'SourceHanSansCN-VF',
    (fontBase64String as string).replace('data:font/ttf;base64,', '')
  );
  pdf.addFont('SourceHanSansCN-VF', 'SourceHanSansCN-VF', 'normal');
  pdf.setFont('SourceHanSansCN-VF');
  pdf.text('[CN] 你好世界', 10, 10);
  pdf.text('[JP] こんにちは世界', 10, 20);
  pdf.text('[KR] 안녕하세요 세계', 10, 30);
  pdf.text('[EN] Hello world', 10, 40);
  // pdf.setFontSize(20);
  // pdf.text('你好世界', 10, 50);
  // pdf.setFont('SourceHanSansCN-VF', 'normal', 400);
  // pdf.text('你好世界', 10, 60);
  // pdf.addImage(
  //   'https://wave-app.cdn.bcebos.com/%E4%B8%8B%E8%BD%BD.jpeg',
  //   'JPEG',
  //   10,
  //   70,
  //   100,
  //   100
  // );
  pdf.output('pdfobjectnewwindow');
};

const generatePdfByHtml = () => {
  if (divRef.value) {
    const pdf = new jspdf({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    pdf.html(divRef.value, {
      width: pdf.internal.pageSize.getWidth(),
      windowWidth: divRef.value.clientWidth,
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
      callback: () => {
        pdf.output('pdfobjectnewwindow');
      },
    });
  }
};
</script>

<template>
  <div class="card-area">
    <el-button @click="generatePdf">生成 PDF</el-button>
  </div>
  <div class="card-area">
    <div
      ref="divRef"
      class="render-content border p-4 mb-4"
      :style="{
        fontFamily: useCustomFont ? 'SourceHanSansCN-VF' : 'inherit',
      }"
    >
      <div
        class="bg-pink-500 h-20 text-light-50 flex items-center justify-center"
      >
        <p>[CN] 你好世界，今天天气不错</p>
      </div>
      <p>[HK/TW] 你好世界，今天天氣不錯</p>
      <p>[JP] こんにちは、今日はいい天気ですね</p>
      <p>[KR] 안녕하세요 세상님 오늘 날씨가 좋네요</p>
      <p>[EN] Hello world</p>
      <p><b>文本加粗测试</b></p>
      <p>标点，符号、测试</p>
    </div>
    <el-button @click="useCustomFont = !useCustomFont">
      使用{{ useCustomFont ? '系统' : 'PDF' }}字体
    </el-button>
    <el-button @click="generatePdfByHtml">根据 HTML 生成 PDF</el-button>
  </div>
</template>

<style lang="scss" scoped>
@font-face {
  font-family: 'SourceHanSansCN-VF';
  src: url('../../../assets/fonts/SourceHanSansCN-VF.ttf') format('truetype');
}
@font-face {
  font-family: 'SourceHanSansHK-VF';
  src: url('../../../assets/fonts/SourceHanSansHK-VF.ttf') format('truetype');
}
@font-face {
  font-family: 'SourceHanSansTW-VF';
  src: url('../../../assets/fonts/SourceHanSansTW-VF.ttf') format('truetype');
}
@font-face {
  font-family: 'SourceHanSansJP-VF';
  src: url('../../../assets/fonts/SourceHanSansJP-VF.ttf') format('truetype');
}
.render-content {
  font-family: 'SourceHanSansCN-VF';
}
</style>
