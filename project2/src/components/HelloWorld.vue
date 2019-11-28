<template>
  <div class="hello">
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{
      products:[],
    }
  },
  methods:{
    getProduct(){
      const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products`
            vm.$http.get(url).then(res=>{
                vm.products = res
                console.log(res)
            })
    }
  },
  created(){
    this.getProduct()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
