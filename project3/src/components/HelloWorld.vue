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
          <button @click="oper2Sending(holder1,item)">{{holder1}}{{item}}</button>
        </tr>
      </table>
    </div>
    <div class="oper3">
      <table>
        <tr v-for="item in oper3.type" :key="item">
          <button>{{item}}</button>
        </tr>
      </table>
    </div>
    <div class="view">
      <table>
        <tr v-for="item in viewdata.food" :key="item.id">
          <button>
            {{item}} <span v-for="item in viewdata.id" :key="item">{{Number(item)}}</span>
          </button>
        </tr>
      </table>
    </div>
    <div class="clean">
      <button @click="clean()">清除</button>
    </div>
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
      },
      viewdata:{
        food:[],
        id:0
      },
      oper3: {
        type: [
          '大辣',
          '中辣',
          '小辣',
          '微辣'
        ]
      }
    }
  },
  computed:{
  },
  methods:{
    oper1Sending(item){
      const vm = this
      vm.holder1 = item
    },
    oper2Sending(holder1,item){
      const vm = this
      let data = [holder1,item].join('')
      vm.viewdata.food.push(data)
      if(vm.viewdata.food){
        vm.viewdata.id += 1
      }else{
        vm.viewdata.id = 0
      }
      console.log(vm.viewdata)
    },
    clean(){
      const vm = this
      vm.viewdata.food = []
      vm.viewdata.id = 0
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
