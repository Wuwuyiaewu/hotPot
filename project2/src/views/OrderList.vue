<template>
    <div>
        <table class="table">
            <tr>
                <th>購買時間</th>
                <th>Email</th>
                <th>購買款項</th>
                <th>應付金額</th>
                <th>是否付款</th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        getOrder(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/orders`
            vm.axios.get(url).then(res=>{
                console.log(res)
            })
        }
    },
    created(){
        this.getOrder()
    }
}
</script>