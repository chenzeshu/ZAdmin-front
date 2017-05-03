<template>
    <div class="v-customers">
            <!--添加按钮-->
        <div class="customer-plus" @click="confirmNew()">
            <Icon type="plus-circled" :size="16"></Icon>
        </div>
            <!--搜索-->
        <div class="customer-search">
            <input v-model="customerName" placeholder="单位名称" class="customer-name">
        </div>
            <!--列表-->
        <Table stripe border :columns="columns" :data="_customers"></Table>
            <!--分页-->
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :current="currentPage" :total="total" :pageSize="pageSize"
                      @on-change="changePage" simple></Page>
            </div>
        </div>
            <!--新增客户-->
        <Modal  v-model="modalNew" width="400" title="新增客户"
                @on-ok="newCustomer">
            <Input v-model="singleNew.name" placeholder="客户单位" style="width: 300px">
            <span slot="prepend">客户单位</span>
            </Input>
            <br>
            <Input v-model="singleNew.addr" placeholder="客户地址" style="width: 300px">
            <span slot="prepend">客户地址</span>
            </Input>
            <br>
            <Input v-model="singleNew.profession" placeholder="客户行业" style="width: 300px">
            <span slot="prepend">客户行业</span>
            </Input>
            <br>
                <Radio-group v-model="singleNew.type">
                    <Radio label="0">
                        <span>已签约</span>
                    </Radio>
                    <Radio label="1">
                        <span>未签约</span>
                    </Radio>
                </Radio-group>
        </Modal>
            <!--编辑客户-->
        <Modal  v-model="modalEdit" width="400" title="编辑客户"
            @on-ok="edit">
            <Input v-model="singleEdit.name" placeholder="客户单位" style="width: 300px">
              <span slot="prepend">客户单位</span>
            </Input>
            <br>
            <Input v-model="singleEdit.addr" placeholder="客户地址" style="width: 300px">
                <span slot="prepend">客户地址</span>
            </Input>
            <br>
            <Input v-model="singleEdit.profession" placeholder="客户行业" style="width: 300px">
                <span slot="prepend">客户行业</span>
            </Input>
            <br>
            <Radio-group v-model="singleEdit.type">
                <Radio label="0">
                    <span>已签约</span>
                </Radio>
                <Radio label="1">
                    <span>未签约</span>
                </Radio>
            </Radio-group>
        </Modal>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .v-customers
        position relative
        .customer-plus
            position: absolute;
            top: 13px;
            left: 10px;
            width: 20px;
            height: 30px;
            color: #39f;
            z-index: 10;
        .customer-search
            position: absolute;
            top: 1px;
            left: 30px;
            width: 20px;
            height: 30px;
            z-index: 10;
            .customer-name
                display: block;
                border none
                border-bottom: 1px dotted rgba(0,0,0,.2);
                background #f5f7f9
                height: 24px;
                width: 8vw
                margin: 8px 10px;
                line-height: 24px;
                text-indent: 16px;
                outline: 0;
                &::placeholder
                    font-weight 700
                    color #657180
@keyframes highlight
    0%
        font-weight:400
        color rgba(209,35,35,.4)
    25%
        font-weight:700
        color rgba(209,35,35,.8)
    50%
        font-weight:700
        color rgba(209,35,35,.4)
    75%
        font-weight:700
        color rgba(209,35,35,.8)
    100%
        font-weight:400
        color rgba(209,35,35,.4)

</style>

<script type="text/ecmascript">
    import Vue from 'vue'
    import {mapActions, mapGetters} from 'vuex'
    var cc = console.log;
    export default {
        data(){
            return {
                customersSource:[], //源层，用于搜索空字符时无刷新返回
                customers : [],  //第二缓冲层
                columns: [
                    {
                        title: '　',
                        key: 'name',
                        fixed: 'left',
                        render(row,column,index){
                            return `<a href="javascript:return false" @click="jump(${row.id})">${row.name}</a>`
                        }
                    },
                    {
                        title: '客户地址',
                        key: 'addr',
                    },
                    {
                        title: '客户行业',
                        key: 'profession',
                    },
                    {
                        title: '是否签约',
                        key: 'type',
                        render (row, column, index) {
                            if(row.type == 0){
                                return `已签约`
                            }else{
                                return `未签约`
                            }
                        },
                        filters: [
                            {
                                label: '已签约',
                                value: 0
                            },
                            {
                                label: '未签约',
                                value: 1
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 0) {
                                return row.type == 0;
                            } else if (value === 1) {
                                return row.type == 1;
                            }
                        },
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed:'right',
//                        width:210,
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button>
                                    <i-button type="primary" size="small" @click="confirmEdit(${index})">编辑</i-button>
                                    <i-button type="error" size="small" @click="confirmRemove(${index})">删除</i-button>`;
                        }
                    }
                ],
                currentPage:1,
                pageSize:10,
                modalNew : false,
                singleNew:{
                    type:0
                },
                modalEdit : false,
                singleEdit : {},
                index:null,
                customerName:null
            }
        },
        computed:{
            ...mapGetters({
                firstBread : 'firstBread',
                secondBread : 'secondBread',
                thirdBread : 'thirdBread',
            }),
            total(){
                return this.customers.length
            },
            _customers(){
                let end = this.currentPage * this.pageSize
                let start = end - this.pageSize
                return this.customers.slice(start,end)
            }
        },
        watch:{
          customerName : function(){
              this.searchName()
          }
        },
        methods: {
            ...mapActions([
               'changeBread'
            ]),
            jump(id){
              this.$router.push({ name : 'cuscontract', params: { id: id } })
            },
            searchName: _.debounce(function () {
                if (!this.customerName){
                    this.customers = this.customersSource
                    return
                }
                this.$http.get('/customers/search/'+this.customerName).then(res=>{
                    this.customers = res.data
                }, err=>{
                    this.$message.error('搜索失败')
                })
            },500),
            highLight(){
                var oRow = document.getElementsByClassName('ivu-table-row')
                oRow[this.index].style.cssText = "animation:highlight 5s ease-in"
            },
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `单位名称：${this.customers[index].name}<br>地址：${this.customers[index].addr}<br>行业：${this.customers[index].profession}`
                })
            },
            confirmEdit (index){
                //唯一要注意的，是index是当前页的index，也就是_customers的index，而不是customers的。
                this.modalEdit = !this.modalEdit
                this.singleEdit = Object.assign({}, this._customers[index])
                this.index = index
            },
            confirmRemove(index){
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p>确定删除客户？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.remove(index)
                    }
                });
            },
            confirmNew(){
                this.modalNew = ! this.modalNew
            },
            newCustomer(){
                this.$http.post('/customers/', this.singleNew).then(res=>{
                    this.customers.unshift(this.singleNew)
                    this.$Message.success('编辑成功');
                    //高亮
                    this.$nextTick(()=>{
                        this.index = 0
                        this.highLight()
                    })
                }, err=>{
                    this.$Message.error('新增失败');
                    err.status
                })
            },
            edit(){
              this.$http.patch('/customers/'+this.singleEdit.id, this.singleEdit).then(res=>{
                  this.$Message.success('编辑成功');
                    var _index = this.customers.indexOf(this._customers[this.index])
                    Vue.set(this.customers, _index, this.singleEdit)
                  //高亮
                  this.$nextTick(()=>{
                      this.highLight()
                  })
              },err=>{
                  this.$Message.error('编辑失败');
                  err.status
              })
            },
            remove (index) {
                this.$http.delete('/customers/'+this._customers[index].id).then(res=>{
                    this.$Message.success('删除成功');
                    this.customers.splice(index, 1);
                }, err=>{
                    this.$Message.error('删除失败');
                    err.status
                })
            },
            changePage(val){
                this.currentPage = val;
            }
        },
        created(){
            this.$Loading.start();
            this.$http.get("/customers").then(res=>{
                this.$Loading.finish();
                this.customersSource = res.data
                this.customers = this.customersSource

                let bread = {
                    first:{
                        name : '客服',
                        href : '???'
                    },
                    second : {
                        name:  "客户信息总览",
                        href : '#'
                    },
                    third : {}
                }
                this.changeBread(bread)
            })
        }
    }
</script>
