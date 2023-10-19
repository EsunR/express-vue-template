<script lang="ts" setup>
import Connection from './components/Connection.vue';
import ChatInput from './components/ChatInput.vue';
import MessageHub from './components/MessageHub.vue';

defineOptions({
  name: 'Websocket',
});
</script>

<template>
  <connection />
  <chat-input />
  <message-hub />
</template>
