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
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                    加到購物車
                    </button>
                </div>
                </div>
            </div>
        </div>
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
                <select name="" class="form-control mt-3" v-model="product.num">
                  <option :value="num" v-for="num in 10" :key="num">
                    選購 {{num}} {{product.unit}}
                  </option>
                </select>
              </div>
              <div class="modal-footer">
                <div class="text-muted text-nowrap mr-3">
                  小計 <strong>{{ product.num * product.price }}</strong> 元
                </div>
                <button type="button" class="btn btn-primary"
                  @click="addtoCart(product.id, product.num)">
                  <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>
        </div>
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
    };
  },
  methods: {
    getProducts() {
      const vm = this;
    //   取得訂單列表 api
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products`;
    //   觸發 loading 效果 :active.sync="isLoading"
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
    //   取得訂單列表 api
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${id}`;
    //   觸發 loading 效果 :active.sync="isLoading"
      vm.isLoading = true;
      // 查看購物車的 icon spin 是否顯示倚靠 id 是否等於該查看 id
      vm.status.loadingItem = id
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        // 要打開 modal 使用 $ 必須要 import jquery
        $('#productModal').modal('show')
        // 打開 modal
        console.log(response);
        // 設定假值 isLoading (因為比對是依據 v-if 真假數值)
        vm.isLoading = false;
        // 設定空數 icon (因為比對是依據 v-if ===)
        vm.status.loadingItem = ''
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>