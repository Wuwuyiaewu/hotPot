<template>
    <div>
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
                <tr v-for="(item,key) in products" :key="key">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-right">{{item.price}}</td>
                    <td>
                        <span v-if="item.is_enabled">啟用</span>
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn" @click="openModal(false,item)">編輯</button>
                    </td>
                    <td>{{item.category}}</td>
                </tr>
            </tbody>
        </table>
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
                            <i class="fas fa-spinner fa-spin"></i>
                        </label>
                        <input type="file" id="customFile" class="form-control"
                            ref="files" >
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
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data(){
        return{
            products:[],
            tempProduct:{},
            isNew:false
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
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/products`
            const vm = this
            vm.axios.get(url).then(res=>{
                console.log(res)
                vm.products = res.data.products
            })
        },
        openModal(isNew,item){
            if(isNew){
                this.isNew = true
                this.tempProduct = {}
            }else{
                this.isNew = false
                this.tempProduct = Object.assign({},item)
            }
            $('#productModal').modal('show')
        },
        updateProduct(){
            let url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product`
            let httpRe = 'post'
            const vm = this
            if(!vm.isNew){
                url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product/${vm.tempProduct.id}`
                httpRe = 'put'
            }
            vm.axios[httpRe](url,{data:vm.tempProduct}).then(res=>{
                if(res.data.success){
                    $('#productModal').modal('hide')
                    vm.getProducts()
                }else{
                    $('#productModal').modal('hide')
                    vm.getProducts()
                    console.log('訊息失敗')
                }
            })
        }
    },
    created(){
        this.getProducts()
    }
}

</script>

<style lang="scss" scoped>

</style>