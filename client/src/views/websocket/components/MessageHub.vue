<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import useMessageWs from '../hooks/useMessageWs';
import { MessageServerToClientEvents } from '@express-vue-template/types/ws';

defineOptions({
  name: 'MessageHub',
});

const messageWsState = useMessageWs();
const chatMessageHub = ref<string[]>([]);

const onListenChatMessage: MessageServerToClientEvents['chat message'] = (
  msg
) => {
  chatMessageHub.value.push(msg);
};

const onListenBroadcastMessage: MessageServerToClientEvents['broadcast message'] =
  (msg) => {
    ElMessageBox.alert(msg, 'Broadcast Message');
  };

const onListenDisconnect = () => {
  chatMessageHub.value = [];
};

onMounted(() => {
  messageWsState.socket.value?.on('chat message', onListenChatMessage);
  messageWsState.socket.value?.on(
    'broadcast message',
    onListenBroadcastMessage
  );
  messageWsState.socket.value?.on('disconnect', onListenDisconnect);
});

onUnmounted(() => {
  messageWsState.socket.value?.off('chat message', onListenChatMessage);
  messageWsState.socket.value?.off(
    'broadcast message',
    onListenBroadcastMessage
  );
  messageWsState.socket.value?.off('disconnect', onListenDisconnect);
});
</script>

<template>
  <div class="card-area mb-4">
    <h1 class="text-xl mb-4">Chat Message Hub</h1>
    <div v-for="message in chatMessageHub" :key="message">{{ message }}</div>
  </div>
</template>
