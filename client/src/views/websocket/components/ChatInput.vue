<script lang="ts" setup>
import useMessageWs from '../hooks/useMessageWs';

defineOptions({
  name: 'ChatInput',
});

const { socket, connected } = useMessageWs();
const chatMessageText = ref('');
const broadcastMessagesText = ref('');

function sendChatMessage() {
  socket.value?.emit('chat message', chatMessageText.value, (response) => {
    if (response.success) {
      chatMessageText.value = '';
    }
  });
  chatMessageText.value = '';
}

async function sendBroadcastMessage() {
  try {
    const res = await socket.value?.emitWithAck(
      'broadcast message',
      broadcastMessagesText.value
    );
    if (res?.success) {
      broadcastMessagesText.value = '';
    }
  } catch {
    console.log('服务在给定的时间内没有确认');
  }
}
</script>

<template>
  <div class="card-area mb-4">
    <h1 class="text-xl mb-4">Chat</h1>
    <el-row :gutter="12" class="mb-4">
      <el-col :span="20">
        <el-input v-model="chatMessageText" @keydown.enter="sendChatMessage" />
      </el-col>
      <el-col :span="4">
        <el-button :disabled="!connected" @click="sendChatMessage">
          发送消息
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="mb-4">
      <el-col :span="20">
        <el-input
          v-model="broadcastMessagesText"
          @keydown.enter="sendBroadcastMessage"
        />
      </el-col>
      <el-col :span="4">
        <el-button :disabled="!connected" @click="sendBroadcastMessage">
          发送广播
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
