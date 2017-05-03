<template>
    <!--组件：添加公司/单位-->
    <div class="addcompany">
        <div class="companys-wrapper" v-if="company">
            <!--特别注意：company.name为null时不可提交，还没有设置-->
            <div class="company-wrapper touch">
                <div class="company-ellipse" @click="removeCompany()">
                    {{ company.name }}
                </div>
            </div>
        </div>
        <div class="companys-wrapper2 text-center" v-if="!company">
                    {{customer_name}}
        </div>
        <!--添加符号-->
        <div class="company-addicon">
            <i-switch v-model="switch1" @on-change="showList"></i-switch>
        </div>
        <!--弹出选框-->
        <transition name="fade">
            <div class="companys-list" v-show="listFlag">
                <!--搜索-->
                <div class="add-search">
                    <input v-model="companyName" placeholder="输入公司名" class="add-name"
                           :input="search()">
                </div>
                <!--列表-->
                <Table :columns="columns" :data="rows"></Table>
            </div>
        </transition>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
    .addcompany
        position relative
        display flex
        justify-content space-around
        align-items center
        .companys-wrapper2
            height: 24px;
            width: 78%
            border-bottom: 1px dotted #000;
        .companys-wrapper
            flex 1
            display flex
            flex-wrap wrap
            justify-content space-around
            align-items center
            .company-wrapper
                flex 1
                box-sizing border-box
                padding 0 2px
                .company-ellipse
                    min-width 100px
                    border-bottom: 2px solid #000;
                    color: #000;
                    text-align center
        .company-addicon
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
        .companys-list
            position: fixed;
            top: 100px;
            right: 0;
            width: 20vh;
            height: calc(62% - 50px);
            background: #fff;
            radius:6px 0 0 6px
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
                companyName:'',
                listFlag:false,
                rows:[
                ],
                company: null,
                switch1:false, //滑动按钮
                columns:[
                    {
                        title: '　',
                        key: 'name',
                        width:200,
                        render(row, columns, index){
                            return `<div class="text-center touch" @click="addToList($event, row)" @click.ctrl="addToListMul(row)">${ row.name }</div>`
                        }
                    },
                ],
            }
        },
        props:{
            customer_name:{
                type:String,
            }
        },
        methods:{
            ...mapActions([
               'addCusTo'
            ]),
            search: _.debounce(function(){
                if(!this.companyName)
                    return

                this.$http.get('/addman/cus/'+this.companyName).then(res=>{
                    this.rows = res.data
                })
            },300),
            addToList(event, company){
                controlTest(event)
                this.company = company
                this.listFlag = false
                this.switch1 = false
                this.addCusTo(company)
            },
            addToListMul(company){

            },
            removeCompany(){
                this.company = null
                this.$store.state.addman.cus = {}
            },
            showList(){
                this.listFlag = !this.listFlag
            }
        },
        mounted() {
        }
    }
</script>
