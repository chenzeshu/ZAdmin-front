<template>
    <div class="v-addman">
        <!--人员显示-->
        <div class="men-wrapper">
            <div class="man-wrapper" v-show="showFlag" v-for="man in men">
                <div class="man-ellipse" @click="remove(man)">
                    {{ man.name }}
                </div>
            </div>
        </div>

        <!--添加符号-->
        <div class="man-addicon">
            <i-switch v-model="switch1" @on-change="showList"></i-switch>
        </div>
        <!--弹出选框-->
        <transition name="fade">
            <div class="men-list" v-show="listFlag">
                <!--搜索-->
                <div class="add-search">
                    <input v-model="manName" placeholder="输入......" class="add-name"
                           :input="search()">
                </div>
                <!--列表-->
                <Table :columns="columns" :data="rows"></Table>
            </div>
        </transition>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .v-addman
        position relative
        display flex
        justify-content space-around
        align-items center
        .men-wrapper
            flex 1
            display flex
            flex-wrap wrap
            justify-content space-around
            align-items center
            .man-wrapper
                flex 1
                box-sizing border-box
                padding 0 2px
                .man-ellipse
                    min-width 100px
                    border-bottom: 2px solid #000;
                    color: #000;
                    text-align center
        .man-addicon
            flex 0 0 30px
            width 30px
            height 30px
            justify-self flex-around
            box-sizing border-box
            padding 3px
            .icon-wrapper
                width 100%
                border 1px dotted #000
                border-radius 50%
                &:active
                    background red
                i
                    margin 0 0 0 4.6px
        .fade-enter-active,.fade-leave-active
            transition all .2s ease-in
        .fade-enter, .fade-leave-to
            transform translateX( 20vh )
        .men-list
            position: fixed;
            top: 100px;
            right: 0;
            width: 20vh;
            height: calc(62% - 50px);
            border-radius 4px 0 0 4px
            background: #fff;
            .add-search
                position: absolute;
                top: 1px;
                left: 4px;
                width: 100%;
                height: 30px;
                z-index: 10;
                .add-name
                    display: block;
                    border none
                    border-bottom: 1px dotted rgba(0,0,0,.2);
                    background #f5f7f9
                    height: 24px;
                    width: 100%
                    margin: 8px 2px;
                    line-height: 24px;
                    text-indent: 14px;
                    outline: 0;
                    &::placeholder
                        font-weight 700
                        color #657180

</style>

<script type="text/ecmascript">
    import { controlTest } from '../../common/utils/controlTest'
    import { mapActions } from 'vuex'
    var cc = console.log;
    export default {
        data(){
            return {
                showFlag:true,
                listFlag:false,
                rows:[],    //搜索结果
                manName:'',//搜索输入的名字
                switch1:false, //滑动按钮
                columns:[
                    {
                        title: '　',
                        key: 'name',
                        width:200,
                        render(row, columns, index){
                            return `<div class="text-center touch" @click="addToList($event, row)">${ row.name }</div>`
                        }
                    },
                ],
            }
        },
        props:{
          men:{
              type:Array
          },
          type:{
              type:Number  //1：项目经理，2：技术经理，3：施工人员，4：回访人，5：客户联系人，6：单位名称，7：行业  以后还有等
          },
          contract_id:{
              type:Number
          }
        },
        methods:{
            ...mapActions[
                    "addPmTo", "addTmTo", "addWorkerTo", "addVisitorTo", "addCusTo", "addCus2To", "addProfessionTo"
                ],
            showList(){
              this.listFlag = !this.listFlag
            },
            addToList(event, man){
                controlTest(event)
                if (this.men){ //验证props是否传入
                   this.men.push(man)
                }
                this.listFlag = false
                this.switch1 = false
                this.manName = ''

                switch (this.type){
                    case 1:
                        this.addPmTo(this.men)
                        break
                    case 2:
                        this.addTmTo(this.men)
                        break
                    case 3:
                        this.addWorkerTo(this.men)
                        break
                    case 4:
                        this.addVisitorTo(this.men)
                        break
                    case 5:
                        this.addCus2To(this.men)
                        break
//                    case 6:
//                        this.addCusTo(this.men)
//                        break
                    case 7:
                        this.addProfessionTo(this.men)
                        break
                    default:
                        return
                        break
                }
            },
            addToListMul(){

            },
            search(){
                if(!this.manName){
                    return
                }
                switch (this.type){
                    case 1:
                        this.$http.get('/addman/users/'+this.manName).then(res=>{
                            this.rows = res.data
                        })
                        break
                    case 2:
                        this.$http.get('/addman/users/'+this.manName).then(res=>{
                            this.rows = res.data
                        })
                        break
                    case 3:
                        this.$http.get('/addman/users/'+this.manName).then(res=>{
                            this.rows = res.data
                        })
                        break
                    case 4:
                        this.$http.get('/addman/users/'+this.manName).then(res=>{
                            this.rows = res.data
                        })
                        break
                    case 5:
                        this.$http.get('/addman/cus2s/'+this.manName).then(res=>{
                            this.rows = res.data
                        })
                        break
//                    case 6:
//                        this.$http.get('/addman/cus/'+this.manName).then(res=>{
//                            this.rows = res.data
//                        })
//                        break
                    case 7:
                        this.$http.get('/addman/profession/'+this.manName).then(res=>{
                            this.rows = res.data
                        })
                        break
                    default:
                        return
                        break
                }

            },
            remove(man){
                let index = this.men.indexOf(man)
                switch (this.type){
                    case 1:
                        this.$store.state.addman.pm.splice(index, 1)
                        break
                    case 2:
                        this.$store.state.addman.tm.splice(index, 1)
                        break
                    case 3:
                        this.$store.state.addman.worker.splice(index, 1)
                        break
                    case 4:
                        this.$store.state.addman.visitor.splice(index, 1)
                        break
                    case 5:
                        this.$store.state.addman.cus2.splice(index, 1)
                        break
//                    case 6:
//                        this.$store.state.addman.cus.splice(index, 1)
//                        break
                    case 7:
                        this.$store.state.addman.profession.splice(index, 1)
                        break
                    default:
                        return
                        break
                }
             },
        },
        mounted() {

        }
    }
</script>
