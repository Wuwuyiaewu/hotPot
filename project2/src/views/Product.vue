<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th width=100>餐點分類</th>
                    <th width=130>餐點名稱</th>
                    <th width=100>價格</th>
                    <th width=100>是否啟用</th>
                    <th width=100>編輯</th>
                    <th width=100>刪除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,key) in products" :key="key">
                    <td>{{item.category}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
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
        }
    },
    created(){
        this.getProducts()
    }
}

</script>

<style lang="scss" scoped>

</style>