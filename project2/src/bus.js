// 載入 Vue
import Vue from 'vue';

// 新增一個建構子 $bus 到 Vue 原型內
Vue.prototype.$bus = new Vue()
let messages = [];
function updateMessage(message, status) {
    // 定義 id 數值
    // 時間就是僅此唯一的 id
    const timestamp = Math.floor(new Date() / 1000);
    messages.push({
        message,
        status,
        timestamp
    });
    // 訊息跳出後，過一段時間必須移除
    removeMessageWithTiming(timestamp);
}
// 透過 click 事件傳入key
function removeMessage(num) {
    // 對 messages 刪除位置與數量
    this.messages.splice(num, 1);
}
// 設置時間設定
function removeMessageWithTiming(timestamp) {
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
}
this.$bus.$on('message:push', (message, status = 'warning') => {
    updateMessage(message, status);
});