<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <!-- 回到前一頁面也是根據 api 回傳真或假值去做判斷 -->
            <!-- 並綁定上動態 class -->
            <li class="page-item" :class="{'disabled':!pagedata.has_pre}">
                <!-- 利用css 阻止 current_page 不足時候觸發  -->
                <!-- 抓取current 去更改 page -->
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProducts">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            <!-- api 會傳回 pagedata.total_pages 的總共頁數 -->
            <!-- 必須在 li 部分綁上 class 樣式 並做判斷 -->
            <!-- 在 a 連結部分加上 click事件 getProducts(page)  達到切換 page-->
            <li class="page-item" v-for="page in pagedata.total_pages" :key="page"  :class="[{'active':pagedata.current_page === page}]">
                <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
                </li>
            <li class="page-item" :class="{'disabled':!pagedata.has_next}">
                <!-- 利用css 阻止 current_page 不足時候觸發  -->
                <!-- 抓取current 去更改 page -->
                <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    props:['pagedata'],
    data(){
        return{
            isLoading:false
        }
    },
    methods:{
        getProducts(page){
            this.$emit('increment',page)
        }
    }
    
}
</script>