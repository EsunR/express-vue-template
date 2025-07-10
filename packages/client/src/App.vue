<template>
  <el-config-provider :locale="zhCn">
    <layout>
      <router-view></router-view>
    </layout>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '@client/components/Layout/index.vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

export default defineComponent({
  name: 'App',
  components: { Layout },
  setup() {
    return {
      zhCn,
    };
  },
});
</script>
