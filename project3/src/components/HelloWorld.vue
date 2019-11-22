<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <!-- 左側 -->
        <div class="col-xl-6">
          <!-- 訂單價格 -->
          <div class="row"></div>
          <!-- 點菜 -->
          <div class="row"></div>
          <!-- 內用、外帶、修改 -->
          <div class="row"></div>
        </div>
        <!-- 右側 -->
        <div class="col-xl-6">
          <!-- 分類 -->
          <div class="row"></div>
          <!-- 細項 -->
          <div class="row"></div>
          <!-- 客製化 -->
          <div class="row"></div>
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
          special:'招牌系列',
          hotpot: [
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
          ],
          roast:'火烤雙拼',
          sukiyaki:'壽喜燒系列',
          hightqty:'精緻火鍋',
          alacarte:'單點',
          soup:'湯頭',
          noodle:'鍋燒麵類'
        }
      ],
      oper2: [
        {
          special:[
            '麻辣腸旺豆腐煲',
            '麻辣招牌綜合',
            '麻辣綜合細粉',
            '麻辣鴨血臭豆腐',
            '麻辣鴨血',
            '麻辣臭豆腐',
            '麻辣牛肉煲',
            '麻辣羊肉煲',
            '麻辣雞肉煲',
            '麻辣豬肉煲'
          ],
          hotpot: [
          '豬肉',
          '羊肉',
          '雞肉',
          '牛肉',
          '海鮮',
          '大腸豬肚',
          '鮮菇',
          '豪華鍋',
          ],
          roast:[
            '梅花豬',
            '培根牛',
            '雞腿排'
          ],
          sukiyaki:[
            '梅花豬',
            '培根牛',
            '雞腿排'
          ],
          hightqty:[
            '精緻豪華鍋',
            '花枝鮑魚鍋',
            '鮮蝦蛤蠣鍋',
            '鮮鯛蛤蠣鍋',
            '豬排風味鍋',
            '沙茶魚頭鍋',
            '藥膳排骨鍋',
            '養生牛肉鍋',
            '養生羊肉鍋',
            '養生雞肉鍋',
            '養生豬肉鍋'
          ],
          alacarte:[
            '白飯',
            '冬粉',
            '單點泡菜',
            '單點大腸豬肚',
            '蛤蠣',
            '北海赤',
            '魚卵捲',
            '蝦丸',
            '貢丸',
            '魚丸',
            '小香腸',
            '魚板',
            '魚餃',
            '蛋餃',
            '燕餃',
            '意麵',
            '拉麵',
            '烏龍麵',
            '科學麵',
            '雞絲麵',
            '臭豆腐',
            '豆皮',
            '鴨血',
            '豆腐',
            '米血',
            '蛋',
            '蝦子',
            '牛肉',
            '羊肉',
            '豬肉',
            '雞肉',
            '老油條',
            '金針菇',
            '高麗菜',
            '小白菜',
            '豆芽菜',
            '高湯',
            '梅花豬',
            '雞腿排',
            '共鍋費',
          ],
          soup:[
            '咖哩',
            '泡菜',
            '茄汁',
            '沙茶',
            '麻辣',
            '香茅',
            '酸白菜',
            '南瓜',
            '起司牛奶',
            '藥膳',
            '豚骨',
            '醇濃牛奶',
            '南洋肉骨茶',
            '大漠蒙古',
            '壽喜燒',
            '換臭豆腐'
          ],
          noodle:[
            '海鮮烏龍麵',
            '海鮮雞絲麵',
            '海鮮拉麵',
            '海鮮意麵'
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
      viewdata:{
        food:[],
        id:0
      },
    }
  },
  computed:{
  },
  methods:{
    oper1Sending(item){
      
    },
    oper2Sending(holder1,item){
      
    },
    clean(){
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@for $i from 1 through 10{
  .col-xl-#{$i}{
    width: $i * 10%;
  }
}
</style>
