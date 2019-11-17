<template>
  <div class="hello">
    <div class="row flex flex-just-center border">
      <!-- 左側 -->
      <div class="col-6 border">
        <div class="row">
          <div class="check">
            <span>金額</span>
          </div>
          <div class="orderlist">
            <table>
              <tr v-for="item in data">
                <td></td>
              </tr>
            </table>
          </div>
          <div class="where">
            <span>外帶</span>
            <span>內用</span>
          </div>
        </div>
      </div>
      <!-- 右側 -->
      <div class="col-6 border">
        <div class="row">
          <div class="type">
            <table>
              <tr>
                <td class="col-4" v-for="item in type" :key="item">
                  <button @click="addCatergory(item)">{{item}}</button>
                  </td>
              </tr>
            </table>
          </div>
          <div class="catergory">
            <table>
              <tr>
                <td class="col-4" v-for="item in catergoryName.type" :key="item">
                  <button @click="sending(catergoryName.name,item)">{{catergoryName.name}}{{item}}</button>
                </td>
              </tr>
            </table>
          </div>
          <div class="another">
            <button>nospicy</button>
            <button>bigspicy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      dish:[],
      type: {
        cow: '香茅酸辣',
        eggplan: '茄汁',
        japan: '日式',
        brand: '招牌',
        single: '單點'
      },
      catergoryName: {
        name: '',
        type: {
          cow: 'cow',
          sheep: 'sheep',
          fish: 'fish',
          pig: 'pig'
        }
      }
    }
  },
  methods: {
    addCatergory (item) {
      const vm = this
      vm.catergoryName.name = item
    },
    sending(type,name){
      const vm = this
      vm.data.push(type,name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flex{
  display: flex;
}
.flex-just-center{
  justify-content: center;
}
.row{
  width: 100%;
}
.col-4{
  width: 33.33333%;
}
.col-6{
  width: 50%;
}
.border{
  border: 1px solid #000;
}
</style>
