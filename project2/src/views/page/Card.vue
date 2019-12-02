<template>
    <div>
        <table>
            <tr>
                <th>ID</th>
            </tr>
            <tr v-for="item in products" :key="item.id">
                <td>{{item.title}}</td>
            </tr>
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
        getProducts(){
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/products`
            const vm = this
            console.log(url)
            vm.axios.get(url).then(res=>{
                console.log(res.data)
                vm.products = res.data.products
            })
        }
    },
    created(){
        this.getProducts()
    }
}
</script>