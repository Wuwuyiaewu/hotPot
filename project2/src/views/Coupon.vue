<template>
    <div>
        <div class="row justify-content-end mr-2">
            <button class="btn btn-primary" @click="getCoupon">新增物件</button>
            <table class="table mt-3 text-left">
                <tr>
                    <th width=200>名稱</th>
                    <th>折扣百分比</th>
                    <th width=200>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </tr>
                <tr v-for="item in Data" :key="item.due_data">
                    <td>{{item.title}}</td>
                    <td>{{item.percent}}</td>
                    <td>{{item.due_data}}</td>
                    <td>{{item.is_enable}}</td>
                    <td>
                        <button class="btn">編輯</button>
                    </td>
                </tr>
            </table>
        </div>
        <!-- 新增模板modal -->
        <div class="modal fade" id="newModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <input type="text" class="form-control" id="title"
                                    placeholder="請輸入名稱" v-model="tempData.title">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="percent"
                                    placeholder="請輸入折扣" v-model="tempData.percent">
                            </div>
                            <div class="form-group">
                                <input type="data" class="form-control" id="data"
                                    placeholder="請輸入日期" v-model="tempData.due_date">
                            </div>
                            <div class="form-group">
                                <input type="checkbox" class="form-control" id="able"
                                     v-model="tempData.is_enabled">
                                <label for="able" :true-value="1" :false-value="0">是否啟用</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updataCoupon">確認</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data(){
        return{
            Data:[],
            isNew:true,
            tempData:{},
        }
    },
    methods:{
        openModal(isNewornot){
            const vm = this
            if(isNewornot){
                vm.isNew = true
                vm.tempData = {}
            }else{
                vm.isNew = false
            }
            $('#newModal').modal('show')
        },
        getCoupon(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupon`
        },
        updataCoupon(){
            const vm = this
            const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupon`
            console.log(vm.tempData)
            vm.axios.post(url,{data:vm.tempData}).then((res)=>{
                console.log(res.data)
            })
        }
    }
}
</script>