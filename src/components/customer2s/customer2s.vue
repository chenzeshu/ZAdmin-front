<template>
    <div class="v-cus2s">
        <!--添加按钮-->
        <div class="customer2s-plus" @click="confirmNew()">
            <Icon type="plus-circled" :size="16"></Icon>
        </div>
        <!--搜索-->
        <div class="customer2s-search">
            <input v-model="customer2Name" placeholder="联系人名称" class="customer2s-name">
        </div>
        <!--列表-->
        <Table stripe border :columns="columns" :data="_customer2s"></Table>
        <!--分页-->
        <div style="margin: 10px; overflow: hidden">
            <div style="float: right;">
                <Page :current="currentPage" :total="total" :pageSize="pageSize"
                      @on-change="changePage" simple></Page>
            </div>
        </div>
        <!--新增客户-->
        <Modal  v-model="modalNew" width="400" title="新增客户"
                @on-ok="add">
            <Input v-model="singleNew.name" placeholder="联系人姓名" style="width: 300px">
            <span slot="prepend">联系人姓名</span>
            </Input>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">客户单位</span></Col>
                <Col span="12">
                     <addcompany :customer_name="cus.name"></addcompany>
                </Col>
            </Row>
            <br>
            <Input v-model="singleNew.phone" placeholder="联系方式" style="width: 300px">
            <span slot="prepend">联系方式</span>
            </Input>
            <br>
            <Row>
                <Col span="12" push="6">
                <Radio-group v-model="singleNew.sex">
                    <Radio label="0">
                        <span>男</span>
                    </Radio>
                    <Radio label="1">
                        <span>女</span>
                    </Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Input v-model="singleNew.profession" placeholder="职务（称谓）" style="width: 300px">
            <span slot="prepend">职务（称谓）</span>
            </Input>
            <br>
            <Input v-model="singleNew.department" placeholder="部门" style="width: 300px">
            <span slot="prepend">部门</span>
            </Input>
            <br>
            <Input v-model="singleNew.email" placeholder="邮箱" style="width: 300px">
            <span slot="prepend">邮箱</span>
            </Input>
            <br>
            <Input v-model="singleNew.qq" placeholder="qq" style="width: 300px">
            <span slot="prepend">qq</span>
            </Input>
            <br>
            <Input v-model="singleNew.fax" placeholder="传真" style="width: 300px">
            <span slot="prepend">传真</span>
            </Input>
            <br>
            <Input v-model="singleNew.addr" placeholder="通讯地址" style="width: 300px">
            <span slot="prepend">通讯地址</span>
            </Input>
        </Modal>
        <!--编辑客户-->
        <Modal  v-model="modalEdit" width="400" title="修改客户"
                @on-ok="edit">
            <Input v-model="singleEdit.name" placeholder="联系人姓名" style="width: 300px">
            <span slot="prepend">联系人姓名</span>
            </Input>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">客户单位</span></Col>
                <Col span="12">
                    <addcompany :customer_name="singleEdit.customer_name"></addcompany>
                </Col>
            </Row>
            <br>
            <Input v-model="singleEdit.phone" placeholder="联系方式" style="width: 300px">
            <span slot="prepend">联系方式</span>
            </Input>
            <br>
            <br>
            <Row>
                <Col span="12" push="6">
                <Radio-group v-model="singleEdit.sex">
                    <Radio label="0">
                        <span>男</span>
                    </Radio>
                    <Radio label="1">
                        <span>女</span>
                    </Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Input v-model="singleEdit.profession" placeholder="职务（称谓）" style="width: 300px">
               <span slot="prepend">职务（称谓）</span>
            </Input>
            <br>
            <Input v-model="singleEdit.department" placeholder="部门" style="width: 300px">
                <span slot="prepend">部门</span>
            </Input>
            <br>
            <Input v-model="singleEdit.email" placeholder="邮箱" style="width: 300px">
                <span slot="prepend">邮箱</span>
            </Input>
            <br>
            <Input v-model="singleEdit.qq" placeholder="qq" style="width: 300px">
                <span slot="prepend">qq</span>
            </Input>
            <br>
            <Input v-model="singleEdit.fax" placeholder="传真" style="width: 300px">
                <span slot="prepend">传真</span>
            </Input>
            <br>
            <Input v-model="singleEdit.addr" placeholder="通讯地址" style="width: 300px">
                <span slot="prepend">通讯地址</span>
            </Input>
        </Modal>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .v-cus2s
        position relative
        .customer2s-plus
            position: absolute;
            top: 13px;
            left: 10px;
            width: 20px;
            height: 30px;
            color: #39f;
            z-index: 10;

        .customer2s-search
            position: absolute;
            top: 1px;
            left: 30px;
            width: 20px;
            height: 30px;
            z-index: 10;
            .customer2s-name
                display: block;
                border none
                border-bottom: 1px dotted rgba(0,0,0,.2);
                background #f5f7f9
                height: 24px;
                width: 7vw
                margin: 8px 10px;
                line-height: 24px;
                text-indent: 16px;
                outline: 0;
                &::placeholder
                    font-weight 700
                    color #657180
</style>

<script type="text/ecmascript">
    import Vue from 'vue'
    import addman from '../utils/addman.vue'
    import addcompany from '../utils/addcompany.vue'
    import {mapGetters, mapActions} from 'vuex'
    var cc = console.log;
    export default {
        data(){
            return {
                customer2sSource:[],  //源数据
                customer2s:[],  //缓冲层
                columns:[
                    {
                        title: '　', key: 'name', fixed:'left', width:200,
                    },
                    {
                        title: '单位名称', key: 'customer_name', width:150,
                    },
                    {
                        title: '联系方式', key: 'phone', width:150,
                    },
                    {
                        title: '性别', key: 'sex', width:150,
                    },
                    {
                        title: '职务（称谓）', key: 'job', width:150,
                    },
                    {
                        title: '部门', key: 'department', width:150,
                    },
                    {
                        title: ' 邮箱', key: 'email', width:150,
                    },
                    {
                        title: 'qq', key: 'qq', width:150,
                    },
                    {
                        title: '传真', key: 'fax', width:150,
                    },
                    {
                        title: '通讯地址', key: 'addr', width:150,
                    },
                    {
                        title: '操作', key: 'action', fixed: 'right', align:"center", width: 200,
                        render (row, column, index) {
                            return `<i-button type="primary" size="small" @click="confirmEdit(${index})">编辑</i-button>
                                    <i-button type="error" size="small" @click="confirmRemove(${index})">删除</i-button>`;
                        }
                    }
                ],
                pageSize:10,
                currentPage:1,
                modalNew:false,
                modalEdit:false,
                singleNew:{
                    sex:0
                },
                singleEdit:{},
                index:null,
                customer2Name:null,
            }
        },
        computed:{
            ...mapGetters({
                cus:'cus',
                firstBread : 'firstBread',
                secondBread : 'secondBread',
                thirdBread : 'thirdBread',
            }),
            total(){
              return this.customer2s.length
            },
            _customer2s(){
              let end = this.currentPage * this.pageSize
              let start = end - this.pageSize
              return this.customer2s.slice(start, end)
            },
        },
        watch:{
            cus(newValue, oldValue){
                this.singleNew.customer = newValue
                this.singleEdit.customer = newValue
            },
            customer2Name:function () {
                this.searchName()
            }
        },
        methods:{
            ...mapActions([
               'changeBread'
            ]),
          confirmNew(){
            this.modalNew = !this.modalNew
              this.singleNew.customer = []
          },
          confirmEdit(index){
              this.modalEdit = !this.modalEdit
              this.singleEdit = Object.assign({}, this._customer2s[index])
              this.index = index
          },
          confirmRemove(index){
              this.$Modal.confirm({
                  title: '确认删除',
                  content: '<p>确定删除？</p>',
                  okText: '确定',
                  cancelText: '取消',
                  onOk: () => {
                      this.remove(index)
                  }
              });
          },
          add(){
              let n = this.singleNew
              this.$http.post('/customer2s',n).then(res=>{
                  this.$Message.success('新增成功');
                  this.singleNew = {};
                  this.customer2s.unshift(n)
                  this.$nextTick(()=>{
                      this.index = 0
                      this.highLight()
                  })
              }, err=>{
                  this.$Message.error('新增失败');
              })
          },
          edit(){
              let id = this._customer2s[this.index].id
              let n = this.singleEdit
              this.$http.patch('/customer2s/'+id, n).then(res=>{
                  this.$Message.success('编辑成功');
                  let _index = this.customer2s.indexOf(this._customer2s[this.index])
                  Vue.set(this.customer2s, _index, this.singleEdit)
                  //高亮
                  this.$nextTick(()=>{
                      this.highLight()
                  })
              }, err=>{
                  this.$Message.error('编辑失败');
              })
          },
          remove(index){
              let id = this._customer2s[index].id
              this.$http.delete('/customer2s/'+id).then(res=>{
                  this.$Message.success('删除成功');
                  let _index = this.customer2s.indexOf(this._customer2s[index])
                  this.customer2s.splice(_index, 1)
              }, err=>{
                  this.$Message.error('删除失败');
              })
          },
          changePage(val){
             this.currentPage = val;
          },
          searchName : _.debounce(function () {
              if(!this.customer2Name){
                  this.customer2s = this.customer2sSource
                  return
              }
              this.$http.get('customer2s/search/'+this.customer2Name).then(res=>{
                  this.customer2s = res.data
              }, err=>{

              })
          },500),
          highLight(){
                var oRow = document.getElementsByClassName('ivu-table-row')
                oRow[this.index].style.cssText = "animation:highlight 5s ease-in"
            },
        },
        created() {
            this.$Loading.start();
            this.$http.get('/customer2s').then(res=>{
                this.$Loading.finish();
                this.customer2sSource =res.data
                this.customer2s = this.customer2sSource

                let bread = {
                    first:{
                        name : '客服',
                        href : '???'
                    },
                    second : {
                        name:  "客户联系人总览",
                        href : '#'
                    },
                    third : {}
                }
                this.changeBread(bread)
            }, err=>{

            })
        },
        components:{
            addman,addcompany
        }
    }
</script>
