<script lang="ts" setup>
import useMessageWs from '../hooks/useMessageWs';

defineOptions({
  name: 'Connection',
});

const messageWsState = useMessageWs();
</script>

<template>
  <div class="card-area mb-4">
    <h1 class="text-xl mb-4">Connection</h1>
    <div class="mb-4">
      <el-button @click="messageWsState.connect">建立连接</el-button>
      <el-button @click="messageWsState.disconnect">断开连接</el-button>
    </div>
    <div>active: {{ messageWsState.socket.value?.active }}</div>
    <div>connected: {{ messageWsState.connected }}</div>
    <div>id: {{ messageWsState.id }}</div>
  </div>
</template>
