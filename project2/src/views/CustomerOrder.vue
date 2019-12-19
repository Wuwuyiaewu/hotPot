<template>
    <div>
        <!-- 讀取中效果 -->
        <!-- :active.sync -->
        <alert/>
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
                    <button type="button" class="btn btn-outline-secondary btn-sm">
                    <i class="fas fa-spinner fa-spin"></i>
                    查看更多
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
                    <i class="fas fa-spinner fa-spin"></i>
                    加到購物車
                    </button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
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
  },
  created() {
    this.getProducts();
  },
};
</script>