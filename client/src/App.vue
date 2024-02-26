<template>
  <el-config-provider :locale="zhCn">
    <layout v-if="routerIsReady">
      <router-view></router-view>
    </layout>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@client/components/Layout/index.vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  components: { Layout },
  setup() {
    const routerIsReady = ref(false);
    const router = useRouter();
    router.isReady().then(() => {
      routerIsReady.value = true;
    });

    return {
      zhCn,
      routerIsReady,
    };
  },
});
</script>
