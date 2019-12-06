<template>
    <div>
        <div class="text-right">
            <button class="btn btn-primary mt-4 mb-2" @click="openModal">建立新產品</button>
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
                    <td>{{item.category}}</td>
                    <td>{{item.category}}</td>
                </tr>
            </tbody>
        </table>
        <!-- 模板觸發 預設隱藏start -->
        <!-- Modal -->
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
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
        openModal(){
            $('#productModal').modal('show')
        }
    },
    created(){
        this.getProducts()
    }
}

</script>

<style lang="scss" scoped>

</style>