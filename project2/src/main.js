import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// 在所有router切換以前做的動作
router.beforeEach((to, from, next) => {
  // 設置檢查項目，前往的目標meta.requiredUser為真或沒有該做的動作
  if (to.meta.requiredUser) {
    const check = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    // 如果有開啟true，做什麼?
    // 做登入檢查
    axios.post(check).then(res=>{
      if(res.data.success){
        console.log(res)
        next()
      }else{
        next({ path: "/login" });
      }
    })
  }else{
    next()
  }
});