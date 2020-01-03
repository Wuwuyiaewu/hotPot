<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in alldataHold" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{background:`url(${item.imageUrl})`}">
          </div>
          <!-- style的格式注意 -->
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text"></p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="item.id === status"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="item.id === status"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 購物車資訊開始 -->
    <table class="table">
      <thead>
        <tr>
          <th>刪除</th>
          <th>品項</th>
          <th>數量</th>
          <th>價格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button class="btn btn-danger" @click="delcart(item.id)">
              刪除
            </button>
          </td>
          <td>{{item.product.title}}</td>
          <td>{{item.qty}}</td>
          <td>{{item.product.price}}
              <p v-if="item.coupon" class="text-success">已套用優惠碼</p>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="cart.total">
        <tr >
          <td colspan="3" class="text-right" v-if="cart.total === cart.final_total">總計</td>
          <td v-if="cart.total === cart.final_total">{{cart.total}} $</td>
          <td class="text-right" v-if="cart.total !== cart.final_total">總計</td>
          <td v-if="cart.total !== cart.final_total"><del>{{cart.total}} $</del></td>
          <td class="text-right" v-if="cart.total !== cart.final_total">總計</td>
          <td v-if="cart.total !== cart.final_total">{{cart.final_total}} $</td>
        </tr>
      </tfoot>
    </table>
    <!-- 購物車資訊結束 -->
    <!-- 套用優惠券開始 -->
    <div class="input-group mb-3 input-group-sm">
      <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="addcoupon">
          套用優惠碼
        </button>
      </div>
    </div>
    <!-- 套用優惠券結束 -->
    <!-- 驗證表開始 -->
    <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
    <form class="col-md-6" @submit.prevent="createOrder">
      <div class="form-group">
        <label for="useremail">Email</label>
        <ValidationProvider rules="email" v-slot="{ errors }">
          <input type="text" class="form-control"  v-model="form.user.email" id="useremail" placeholder="請輸入email">
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label for="username">收件人姓名</label>
        <ValidationProvider v-slot="{ errors }" rules="required" name="姓名">
          <input type="text" class="form-control" name="name" id="username" v-model="form.user.name"
            placeholder="輸入姓名">
          <span class="text-danger">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label for="usertel">收件人電話</label>
        <ValidationProvider v-slot="{ errors }" rules="required" name="電話">
          <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
          <span class="text-danger"> {{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label for="comment">留言</label>
        <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
      </div>
      <div class="text-right">
        <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
      </div>
    </form>
    </ValidationObserver>
    <!-- 驗證表結束 -->
    <!-- 查看購物車之modal 開始 -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 
              <strong v-if="product.price">{{ product.num * product.price }}</strong>
              <strong v-if="!product.price">{{ product.num * product.origin_price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === spin_id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看購物車之modal 結束 -->
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data(){
    return{
      alldataHold:[],
      product:{},
      isLoading: false,
      spin_id:'',
      cart:{},
      coupon_code:'',
      status:'',
      form:{
        user:{
          email:'',
          name:'',
          tel:'',
        }
      }

    }
  },
  methods:{
    getProducts(){
      const vm = this
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products`
      vm.isLoading = true
      vm.axios.get(url).then(res=>{
        vm.alldataHold = res.data.products
        vm.isLoading = false
      })
    },
    getProduct(id){
      const vm = this
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${id}`
      vm.status = id
      vm.axios.get(url).then(res=>{
        $('#productModal').modal('show')
        vm.product = res.data.product
        vm.status = ''
        vm.product.num = 1
        console.log(res.data)
      })
    },
    addtoCart(id,qty=1){
      const vm = this
      vm.status = id
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
      vm.isLoading = true
      const cart = {
          product_id: id,
          qty
        }
      vm.axios.post(url,{data:cart}).then(res=>{
        vm.isLoading = false
        $('#productModal').modal('hide')
        vm.getcart()
        vm.status = ''
        console.log(res)
      })
    },
    getcart(){
      const vm = this
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`
      vm.isLoading = true
      vm.axios.get(url).then(res=>{
        console.log(res.data.data)
        vm.isLoading = false
        vm.cart = res.data.data
      })
    },
    delcart(id){
      const vm = this
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart/${id}`
      vm.isLoading = true
      vm.axios.delete(url).then((res)=>{
        console.log(res)
        vm.getcart()
      })
    },
    addcoupon(){
      const vm = this
      let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/coupon`
      const coupon = {
        "code": vm.coupon_code
      }
      vm.isLoading = true
      vm.axios.post(url,{data:coupon}).then((res)=>{
        console.log(res)
        vm.getcart()
      })
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/order`;
      const user = vm.form;
      this.$http.post(api, { data: user }).then(response => {
        if(response.data.success){
          console.log(response.data)
          // 透過前往參數，在結帳頁面得到orderId
          vm.$router.push(`customer_checkout/${response.data.orderId}`)
        }
        vm.isLoading = false;
      });
    }
  },
  created(){
    this.getProducts()
    this.getcart()
  }
}
</script>