<template>
    <div>
        <button class="btn btn-success" @click="loginout">
            singout
        </button>
    </div>
</template>

<script>
export default {
    data(){
        return{

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
        }
    }
}

</script>

<style lang="scss" scoped>

</style>