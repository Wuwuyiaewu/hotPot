<template>
  <div class="hello">
    <div class="oper1">
      <table>
        <tr v-for="item in oper1.type" :key="item">
          <button @click="oper1Sending(item)">{{item}}</button>
        </tr>
      </table>
    </div>
    <div class="oper2">
      <table>
        <tr v-for="item in oper2.type" :key="item">
          <button>{{holder1}}{{item}}</button>
        </tr>
      </table>
    </div>
    <div class="view"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      oper1: {
        type: [
          '日式',
          '麻辣',
          '招牌'
        ]
      },
      holder1:'',
      oper2: {
        type: [
          '豬肉',
          '羊肉',
          '雞肉',
          '牛肉'
        ]
      }
    }
  },
  methods:{
    oper1Sending(item){
      const vm = this
      vm.holder1 = item
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
