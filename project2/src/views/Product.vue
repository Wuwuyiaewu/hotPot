<template>
    <div>
        <!-- 若要載入僅需 -->
        <loading :active.sync="isLoading"></loading>
        <div class="text-right">
            <button class="btn btn-primary mt-4 mb-2" @click="openModal(true)">建立新產品</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th width=200>餐點分類</th>
                    <th >餐點名稱</th>
                    <th width=120>價格</th>
                    <th width=150>是否啟用</th>
                    <th width=120>編輯</th>
                    <th width=120>刪除</th>
                </tr>
            </thead>
            <tbody>
                <!-- 為每個資料做雙向綁定 -->
                <!-- 綁定陣列為 products -->
                <!-- 帶入數值名稱為 item -->
                <tr v-for="(item,key) in products" :key="key">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-right">{{item.price}}</td>
                    <td>
                        <span v-if="item.is_enabled">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <!-- 傳入數值 -->
                        <!-- 並且判定為假 -->
                        <button class="btn btn-outline-primary btn" @click="openModal(false,item)">編輯</button>
                    </td>
                    <td>
                        <!-- 傳入數值 -->
                        <!-- 並且判定為假 -->
                        <button class="btn btn-outline-primary btn" @click="delModal(false,item)">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 分頁元件 -->
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <!-- 回到前一頁面也是根據 api 回傳真或假值去做判斷 -->
                <!-- 並綁定上動態 class -->
                <li class="page-item" :class="{'disabled':!pagination.has_pre}">
                    <!-- 利用css 阻止 current_page 不足時候觸發  -->
                    <!-- 抓取current 去更改 page -->
                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts(pagination.current_page - 1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <!-- api 會傳回 pagination.total_pages 的總共頁數 -->
                <!-- 必須在 li 部分綁上 class 樣式 並做判斷 -->
                <!-- 在 a 連結部分加上 click事件 getProducts(page)  達到切換 page-->
                <li class="page-item" v-for="page in pagination.total_pages" :key="page"  :class="[{'active':pagination.current_page === page}]">
                    <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
                    </li>
                <li class="page-item" :class="{'disabled':!pagination.has_next}">
                    <!-- 利用css 阻止 current_page 不足時候觸發  -->
                    <!-- 抓取current 去更改 page -->
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- 模板觸發 預設隱藏start -->
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image"
                            placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                        </div>
                        <div class="form-group">
                        <label for="customFile">或 上傳圖片
                            <!-- font awosome icon 載入處 -->
                            <!-- 設定v-if搭配狀態讀取時間差 -->
                            <!-- font awosome 裡面的 doc 有資料可以看 -->
                            <!-- index.html 內有 script 可以預先載入 cdn -->
                            <span class="fa-stack fa-1x" v-if="status.fileUploading">
                                <!-- 搭配各種樣式做變化效果 -->
                                <i class="far fa-circle fa-stack-2x" v-if="status.fileUploading"></i>
                                <i class="fas fa-fan fa-spin" v-if="status.fileUploading"></i>
                            </span>
                        </label>
                        <input type="file" id="customFile" class="form-control"
                            ref="files" @change="upload">
                        </div>
                        <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                        class="img-fluid" alt="" :src="tempProduct.imageUrl">
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            placeholder="請輸入標題" v-model="tempProduct.title">
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input type="text" class="form-control" id="category"
                            placeholder="請輸入分類" v-model="tempProduct.category">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input type="unit" class="form-control" id="unit"
                            placeholder="請輸入單位" v-model="tempProduct.unit">
                        </div>
                        </div>
                        <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                            <input type="number" class="form-control" id="origin_price"
                            placeholder="請輸入原價" v-model="tempProduct.origin_price">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control" id="price"
                            placeholder="請輸入售價" v-model="tempProduct.price">
                        </div>
                        </div>
                        <hr>

                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea type="text" class="form-control" id="description"
                            placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                        </div>
                        <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea type="text" class="form-control" id="content"
                            placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            id="is_enabled" v-model="tempProduct.is_enabled">
                            <label class="form-check-label" for="is_enabled" :true-value="1" :false-value="0">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                </div>
                </div>
            </div>
        </div>
        <!-- 模板觸發 預設隱藏end -->
        <!-- 刪除模板start -->
        <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-body">
                    <div class="row">
                    <h1>是否刪除呢?</h1>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="delProduct">確認</button>
                </div>
                </div>
            </div>
        </div>
        <!-- 刪除模板end -->
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    data(){
        return{
            products:[],
            tempProduct:{},
            isNew:true,
            isLoading:false,
            status:{
                fileUploading:false,
            }
        }
    },
    methods:{
        loginout(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/logout`
            vm.axios.post(url).then(res=>{
                console.log(res.data)
                if(res.data.success){
                    vm.$router.push('/signin')
                }else{
                    console.log('登出失敗')
                }
            })
        },
        getProducts(){
            // 取得產品路徑
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/products`
            const vm = this
            // 讀取開始使用loading
            vm.isLoading = true
            vm.axios.get(url).then(res=>{
                console.log(res)
                // 產品陣列等於取的api的陣列
                vm.products = res.data.products
                // 讀取完成後結束loading
                vm.isLoading = false

            })
        },
        // 打開模板
        // 是否是新的
        // 有傳入物件數值則帶入
        openModal(isNew,item){
            if(isNew){
                // 有isNew數值為"真"代表新增產品
                // 為暫存設定空物件
                this.tempProduct = {}
                // 是否為新值判定為新
                // 並連帶影響更新 updateProduct
                this.isNew = true
            }else{
                // isNew數值為"假"代表新增產品
                // 為暫存設定放入item物件
                // 避免傳參考發生，所以使用es6方法 Object.assign
                this.tempProduct = Object.assign({},item)
                this.isNew = false
            }
            $('#productModal').modal('show')
        },
        // 更新資料
        // 送出資料
        updateProduct(){
            // 連結為新增時的url路徑
            let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product`
            const vm = this
            // 方法為post
            let httpMs = 'post'
            // 但 isNew 不為真的時候 url 與 方法 都需要更改為 put 適用
            if(!vm.isNew){
                // 為 put 抓取指定位置
                url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product/${vm.tempProduct.id}`
                // 方法為 put
                httpMs = 'put'
            }
            // 替 axios 做方法變數 與 路徑變數 和相對應的 data api 格式
            vm.axios[httpMs](url,{data:vm.tempProduct}).then(res=>{
                if(res.data.success){
                    // 若成功
                    // 推入陣列
                    vm.products = res.data.products
                    // 重新取得資料
                    vm.getProducts()
                }else{
                    console.log(res.data)
                    vm.getProducts()
                }
            })
            $('#productModal').modal('hide')
        },
        // 打開刪除介面
        delModal(isNew,item){
            // 將資料傳入暫存區
            // 方便刪除時候可以抓取 id位置
            this.tempProduct = Object.assign({},item)
            this.isNew = false
            $('#delModal').modal('show')
        },
        // 刪除api
        delProduct(){
            const vm = this
            // 傳入 url 位置
            let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product/${vm.tempProduct.id}`
            // 更改方法為刪除
            vm.axios.delete(url).then(res=>{
                if(res.data.success){
                    // 重新整理畫面
                    vm.getProducts()
                }else{
                    console.log(res.data)
                }
            })
            $('#delModal').modal('hide')
        },
        upload(){
            const vm = this
            // 圖片上傳時讀取 icon
            vm.status.fileUploading = true
            // 設定 url 路徑
            let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/upload`
            // 設定檔案
            // 找出檔案位置
            const uploadFile = vm.$refs.files.files[0]
            // 建構新的 FormData 變數
            const formData = new FormData();
            // 為 formData 變數 append 上名稱與檔案
            formData.append('file-to-upload',uploadFile)
            // 為方法設定 路徑 與 檔案 和 格式
            vm.axios.post(url,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                if(res.data.success){
                    // 強制寫入暫存 並找到名稱 做更新的動作
                    vm.$set(vm.tempProduct,'imageUrl',res.data.imageUrl)
                    // 同時在這步驟對 lodaing 狀態 icon 關閉
                    vm.status.fileUploading = false
                }else{
                    // 此處使用 this 會是不同位置需要特別注意
                    // res.data.message 會是訊息提示
                }
            })


        }
        // 上傳圖片
    },
    created(){
        this.getProducts()

    }
}

</script>

<style lang="scss" scoped>

</style>