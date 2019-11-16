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
            <span>點餐</span>
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
            <button>{{catergoryName.name}}spicy</button>
            <button>{{catergoryName.name}}japan</button>
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
      type: {
        cow: 'cow',
        sheep: 'sheep',
        fish: 'fish',
        pig: 'pig'
      },
      catergoryName: {
        name: ''
      }
    }
  },
  methods: {
    addCatergory (item) {
      const vm = this
      vm.catergoryName.name = item
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
