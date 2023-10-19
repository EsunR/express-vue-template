<script lang="ts" setup>
import ChatInput from './components/ChatInput.vue';
import Connection from './components/Connection.vue';
import MessageHub from './components/MessageHub.vue';
import useMessageWs from './hooks/useMessageWs';

defineOptions({
  name: 'Websocket',
});

const { connect, disconnect } = useMessageWs();

onMounted(() => {
  connect();
});

onUnmounted(() => {
  disconnect();
});
</script>

<template>
  <connection />
  <chat-input />
  <message-hub />
</template>
