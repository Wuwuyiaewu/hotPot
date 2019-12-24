<template>
    <div>
        <!-- 讀取中效果 -->
        <!-- :active.sync -->
        <Loading :active.sync="isLoading"></Loading>
        <div class="row mt-4">
           <!-- 推上 api 的資料 -->
           <!-- 並且綁定 id -->
            <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm">
                    <!-- 綁定動態 style 時候 須注意大小寫 -->
                <div style="height: 150px; background-size: cover; background-position: center"
                    :style="{backgroundImage: `url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                    <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
                    <h5 class="card-title">
                    <a href="#" class="text-dark">{{ item.title }}</a>
                    </h5>
                    <p class="card-text">{{ item.content }}</p>
                    <div class="d-flex justify-content-between align-items-baseline">
                    <!-- 當 item.price 折扣價 為falsy 僅顯示原價 -->
                    <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                    <!-- 當 item.price 折扣價 為 truthy 顯示折扣價格 -->
                    <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                    <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
                    </div>
                </div>
                <div class="card-footer d-flex">
                    <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    查看更多
                    </button>
                    <!-- 位置要放對，放到 button 內 -->
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addCart(item.id)">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id" ></i>
                    加到購物車
                    </button>
                </div>
                </div>
            </div>
        </div>
        <!-- 商品細節查看 -->
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
                <img :src="product.imageUrl" class="img-fluid" alt="">
                <blockquote class="blockquote mt-3">
                  <p class="mb-0">{{ product.content }}</p>
                  <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                </blockquote>
                <div class="d-flex justify-content-between align-items-baseline">
                  <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
                  <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                  <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
                </div>
                <!-- 透過 select 的 v-model 去綁定 num 數值-->
                <select name="" class="form-control mt-3" v-model="product.num">
                  <option :value="num" v-for="num in 10" :key="num">
                    <!-- 動態綁定value -->
                    <!-- 自定義 num 在一定範圍的數字 -->
                    選購 {{num}} {{product.unit}}
                  </option>
                </select>
              </div>
              <div class="modal-footer">
                <div class="text-muted text-nowrap mr-3">
                  <!-- 得到的資料數量 * 價格 -->
                  小計 <strong>{{ product.num * product.price }}</strong> 元
                </div>
                <button type="button" class="btn btn-primary" @click="addCart(product.id,product.num)"
                  >
                  <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- 購物車欄位 -->
        <table class="table">
          <thead>
            <tr>
              <th w=50>刪除</th>
              <th w=200>id</th>
              <th w=50>數量</th>
              <th w=100>價格</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartProduct" :key="item.id">
              <td>
                <button class="btn btn-danger" @click="removeCart(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td>{{item.id}}</td>
              <td>{{item.product.num}} / 個</td>
              <td>{{item.product.price}} 元</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <!-- colspan 可以使表格佔據td幾個 -->
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
  data() {
    return {
      // 全部商品
      products: [],
      // 單一商品
      product:[],
      status: {
        loadingItem: '',
      },
      isLoading: false,
      // 加入購物車 api 格式
      // 格式也可以在api內寫上
      // cartData:{
      //   product_id:'',
      //   qty:''
      // }
      // 購物車商品
      cartProduct:[]
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      // 取得訂單列表 api
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products`;
      // 觸發 loading 效果 :active.sync="isLoading"
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
        // 透過這個modal 可以發覺 product 並非一開始就存在
        // 而是透過點按後觸發 modal 才有檔案內容
        // $('#productModal').modal('show')

      });
    },
    getProduct(id) {
      const vm = this;
      // 取得訂單列表 api
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${id}`;
      // 查看購物車的 icon spin 是否顯示倚靠 id 是否等於該查看 id
      vm.status.loadingItem = id
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        // 要打開 modal 使用 $ 必須要 import jquery
        $('#productModal').modal('show')
        // 打開 modal
        console.log(response);
        // 設定假值 isLoading (因為比對是依據 v-if 真假數值)
        // 設定空數 icon (因為比對是依據 v-if ===)
        vm.status.loadingItem = ''
      });
    },
    addCart(id,qty=1){
      const vm = this;
      // 取得訂單列表 api
      // 購物車資料數值不得有NaN
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`;
      const cartData = {
        product_id:id,
        qty
      }
      vm.status.loadingItem = id
      this.$http.post(url,{data:cartData}).then((res)=>{
        console.log(res)
        vm.getCart()
        vm.status.loadingItem = ''
      })
    },
    getCart(){
      const vm = this;
      // 取得訂單列表 api
      // 購物車資料數值不得有NaN
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`;
      vm.$http.get(url).then((res)=>{
        console.log(res)
        // 找到數值並且推入
        vm.cartProduct = res.data.data.carts
      })
    },
    removeCart(id){
      const vm = this;
      // 取得訂單列表 api
      // 購物車資料數值不得有NaN
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart/${id}`;
      vm.isLoading = true
      vm.$http.delete(url).then(()=>{
        // 找到數值並且推入
        vm.isLoading = false
        vm.getCart()
      })
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>