<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import useMessageWs from '../hooks/useMessageWs';

defineOptions({
  name: 'MessageHub',
});

const messageWsState = useMessageWs();

const chatMessageHub = ref<string[]>([]);

messageWsState.socket.value?.on('chat message', (msg: string) => {
  chatMessageHub.value.push(msg);
});

messageWsState.socket.value?.on('broadcast message', (msg: string) => {
  ElMessageBox.alert(msg, 'Broadcast Message');
});

messageWsState.socket.value?.on('disconnect', () => {
  chatMessageHub.value = [];
});
</script>

<template>
  <div class="card-area mb-4">
    <h1 class="text-xl mb-4">Chat Message Hub</h1>
    <div v-for="message in chatMessageHub" :key="message">{{ message }}</div>
  </div>
</template>
