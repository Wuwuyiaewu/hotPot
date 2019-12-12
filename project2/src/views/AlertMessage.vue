<template>
  <div class="message-alert">
      <!-- 樣式為動態class + item.status -->
      <!-- 每個item 都會友自己的key做綁定 -->
      <!--  -->
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <!-- 對關閉符號按鈕click事件後，傳入 key 位置 -->
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [{
        message: '內容',
        status: 'danger',
        timestamp: '123'
      }],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp,
      });
      this.removeMessageWithTiming(timestamp);
    },
    // 透過 click 事件傳入key
    removeMessage(num) {
        // 對 messages 刪除位置與數量
      this.messages.splice(num, 1);
    },
    // 設置時間設定
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
    // vm.$bus.$emit('message:push');
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>