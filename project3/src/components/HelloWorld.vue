<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <!-- 左側 -->
        <div class="col-xl-6">
          <!-- 訂單價格 -->
          <div class="row">
            <div class="col-xl-12"></div>
          </div>
          <!-- 點菜 -->
          <div class="row">
            <div class="col-xl-12" v-for="(item,key) in view2" :key="key">
              {{item}}
            </div>
          </div>
          <!-- 內用、外帶、修改 -->
          <div class="row">
            <div class="col-xl-3"></div>
          </div>
        </div>
        <!-- 右側 -->
        <div class="col-xl-6">
          <!-- 分類 -->
          <div class="row">
            <div class="col-xl-4" v-for="item in oper1[0]" :key="item" @click="dish('招牌',item)"><button>{{item}}</button></div>
            <div class="col-xl-4" v-for="(item,key) in oper1[1].hotpot" :key="key" @click="dish('火鍋',item)"><button>{{item}}</button></div>
            <div class="col-xl-4" v-for="(item,key) in oper1[2]" :key="key" @click="dish('火烤雙拼',item)"><button>{{item}}</button></div>
            <div class="col-xl-4" v-for="(item,key) in oper1[3]" :key="key" @click="dish('壽喜燒系列',item)"><button>{{item}}</button></div>
            <div class="col-xl-4" v-for="(item,key) in oper1[4]" :key="key" @click="dish('精緻火鍋',item)"><button>{{item}}</button></div>
            <div class="col-xl-4" v-for="(item,key) in oper1[5]" :key="key" @click="dish('單點',item)"><button>{{item}}</button></div>
            <div class="col-xl-4" v-for="(item,key) in oper1[6]" :key="key" @click="dish('湯頭',item)"><button>{{item}}</button></div>
            <div class="col-xl-4" v-for="(item,key) in oper1[7]" :key="key" @click="dish('鍋燒麵類',item)"><button>{{item}}</button></div>

          </div>
          <!-- 細項 -->
          <div class="row">
            <h2>細項</h2>
            <div class="col-xl-3" v-for="(item,key) in view1" :key="key">
              <button @click="sending(item)">{{item.name}}</button>
            </div>
          </div>
          <!-- 客製化 -->
          <div class="row">
            <div class="col-xl-2" v-for="(item,key) in oper3[0].type" :key="key"><button>{{item}}</button></div>
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
      oper1: [
        { 
          special:
          '招牌系列'
        },
        {
          hotpot:[
          '日式火鍋',
          '沙茶火鍋',
          '麻辣火鍋',
          '泡菜火鍋',
          '咖哩火鍋',
          '茄汁火鍋',
          '香茅酸辣鍋',
          '酸白菜火鍋',
          '南瓜火鍋',
          '起司牛奶鍋',
          '藥膳養生鍋',
          '和風豚骨鍋',
          '南洋肉骨茶鍋',
          '大漠蒙古鍋',
          '素食火鍋',
          '醇濃牛奶鍋',
          '壽喜燒'
          ]
        },
        { 
          roast:'火烤雙拼'
        },
        { 
          sukiyaki:'壽喜燒系列'
        },
        { 
          hightqty:'精緻火鍋'
        },
        { 
          alacarte:'單點'
        },
        { 
          soup:'湯頭'
        },
        { 
          noodle:'鍋燒麵類'
        }
      ],
      oper2: [
        {
          special:[
            ['麻辣腸旺豆腐煲',130],
            ['麻辣招牌綜合',100],
            ['麻辣綜合細粉',90],
            ['麻辣鴨血臭豆腐',80],
            ['麻辣鴨血',70],
            ['麻辣臭豆腐',70],
            ['麻辣牛肉煲',140],
            ['麻辣羊肉煲',140],
            ['麻辣雞肉煲',140],
            ['麻辣豬肉煲',130]
          ]
        },
        {
          hotpot: [
            ['豬肉',120],
            ['羊肉',130],
            ['雞肉',130],
            ['牛肉',130],
            ['海鮮',140],
            ['大腸豬肚',140],
            ['鮮菇',140],
            ['豪華鍋',180],
          ]
        },
        {
          roast:[
            ['梅花豬',230],
            ['培根牛',230],
            ['雞腿排',230]
          ]
        },
        {
          sukiyaki:[
            ['梅花豬',200],
            ['培根牛',200],
            ['雞腿排',200]
          ]
        },
        {
          hightqty:[
            ['精緻豪華鍋',210],
            ['花枝鮑魚鍋',180],
            ['鮮蝦蛤蠣鍋',180],
            ['鮮鯛蛤蠣鍋',180],
            ['豬排風味鍋',170],
            ['沙茶魚頭鍋',170],
            ['藥膳排骨鍋',180],
            ['養生牛肉鍋',170],
            ['養生羊肉鍋',170],
            ['養生雞肉鍋',170],
            ['養生豬肉鍋',160]
          ]
        },
        {
          alacarte:[
            ['白飯',10],
            ['冬粉',20],
            ['單點泡菜',30],
            ['單點大腸豬肚',60],
            ['蛤蠣',30],
            ['北海赤',30],
            ['魚卵捲',30],
            ['蝦丸',30],
            ['貢丸',20],
            ['魚丸',20],
            ['小香腸',20],
            ['魚板',20],
            ['魚餃',20],
            ['蛋餃',30],
            ['燕餃',30],
            ['意麵',20],
            ['拉麵',20],
            ['烏龍麵',20],
            ['科學麵',20],
            ['雞絲麵',20],
            ['臭豆腐',20],
            ['豆皮',30],
            ['鴨血',20],
            ['豆腐',20],
            ['米血',20],
            ['蛋',10],
            ['蝦子',50],
            ['牛肉',80],
            ['羊肉',80],
            ['豬肉',50],
            ['雞肉',60],
            ['老油條',30],
            ['金針菇',30],
            ['高麗菜',30],
            ['小白菜',30],
            ['豆芽菜',30],
            ['高湯',20],
            ['梅花豬',80],
            ['雞腿排',80],
            ['共鍋費',20]
          ],
        },
        {
          soup:[
            ['咖哩',20],
            ['泡菜',20],
            ['茄汁',20],
            ['沙茶',10],
            ['麻辣',10],
            ['香茅',20],
            ['酸白菜',20],
            ['南瓜',30],
            ['起司牛奶',30],
            ['藥膳',30],
            ['豚骨',30],
            ['醇濃牛奶',40],
            ['南洋肉骨茶',40],
            ['大漠蒙古',40],
            ['壽喜燒',40],
            ['換臭豆腐',10]
          ],
        },
        {
          noodle:[
            ['海鮮烏龍麵',110],
            ['海鮮雞絲麵',110],
            ['海鮮拉麵',110],
            ['海鮮意麵',110]
          ]
        }
      ],
      oper3: [
        {
          type: [
            '白飯換冬粉',
            '鴨血換臭豆腐',
            '大辣',
            '中辣',
            '小辣',
            '微辣',
            '微微辣',
            '不丫',
            '去血類',
            '不火鍋料',
            '不辣',
            '不要餐具',
            '不要飯',
            '不要醬',
            '不要豆皮',
            '不要冬粉',
            '不要豆腐',
            '不要蔥'
          ]
        }
      ],
      holder1:'',
      viewdata:{},
      view2data:{}
    }
  },
  computed:{
    view1(){
      const vm = this
      if(vm.viewdata.name === '招牌'){
        let obj = []
        vm.oper2[0].special.forEach(el =>{
          obj.push({name:el[0] ,price:el[1]})
        })
        return obj
      }else if(vm.viewdata.name === '火鍋'){
        let obj = []
        vm.oper2[1].hotpot.forEach(el =>{
          obj.push({name:el[0] + vm.viewdata.item ,price:el[1]})
        })
        return obj
        // 練習二
        // 推入陣列取得名稱與價錢
      }else if(vm.viewdata.name === '火烤雙拼'){
        let obj = []
        vm.oper2[2].roast.forEach(el =>{
          obj.push({name:el[0] + vm.viewdata.item ,price:el[1]})
        })
        return obj
      }else if(vm.viewdata.name === '壽喜燒系列'){
        let obj = []
        vm.oper2[3].sukiyaki.forEach(el =>{
          obj.push({name:el[0] + vm.viewdata.item ,price:el[1]})
        })
        return obj
      }else if(vm.viewdata.name === '精緻火鍋'){
        let obj = []
        vm.oper2[4].hightqty.forEach(el =>{
          obj.push({name:el[0] + vm.viewdata.item ,price:el[1]})
        })
        return obj
      }else if(vm.viewdata.name === '單點'){
        let obj = []
        vm.oper2[5].alacarte.forEach(el =>{
          obj.push({name:el[0] ,price:el[1]})
        })
        return obj
      }else if(vm.viewdata.name === '湯頭'){
        let obj = []
        vm.oper2[6].soup.forEach(el =>{
          obj.push({name:el[0] ,price:el[1]})
        })
        return obj
      }else if(vm.viewdata.name === '鍋燒麵類'){
        let obj = []
        vm.oper2[7].noodle.forEach(el =>{
          obj.push({name:el[0] + vm.viewdata.item ,price:el[1]})
        })
        return obj
      }
    },
    view2(){
      const vm = this
      return vm.view2data
    }
  },
  methods:{
    dish(name,item){
      const vm = this
      vm.viewdata = {name,item}
      console.log(vm.viewdata)
    },
    sending(item){
      const vm = this
      vm.view2data.name = item.name
      vm.view2data.price = item.price
      console.log(vm.view2data)
    },
    clean(){
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
