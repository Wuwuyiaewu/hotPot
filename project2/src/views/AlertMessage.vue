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
      // 定義 message 為陣列
      // 方便後續推入 (push) 內容進去
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      // 定義 id 數值
      // 時間就是僅此唯一的 id
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp
      });
      // 訊息跳出後，過一段時間必須移除
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
      // 設定延遲時間
      setTimeout(() => {
        // 找出每一個 item  訊息
        vm.messages.forEach((item, i) => {
          // 如果該訊息 id 等於 updateMessage 方法內所執行傳入的 id 
          if (item.timestamp === timestamp) {
            // 對該 item 的 key 數值位置 做刪除一個的動作
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
    // 使用$on 去註冊名稱，給予 $emit 去使用觸發
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