<template>
    <div>
        <nav class="navbar navbar-expand-sm navbar-light bg-light">
            <div class="navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav justify-content-end">
                    <li class="nav-item active ">
                        <router-link to="/product/card">美饌佳餚</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">購物車</a>
                    </li>
                    <li class="nav-item">
                        <button class="btn btn-success" @click="loginout">
                            singout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
        <router-view/>
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