<template>
    <div class="v-servicesall">
        <!--搜索-->
        <div class="service-search">
            <input v-model="serviceCode" placeholder="内部受理编号" class="service-name">
        </div>
        <!--列表-->
        <Table stripe border :columns="columns" :data="_services"></Table>
        <!--分页-->
        <div style="margin: 10px; overflow: hidden">
            <div style="float: right;">
                <Page :current="currentPage" :total="total" :pageSize="pageSize"
                      @on-change="changePage" simple></Page>
            </div>
        </div>
        <!--新增客户-->
        <Modal  v-model="modalNew" width="400" title="新增服务单"
                @on-ok="add" class="new-ivu-modal">
            <Input v-model="singleNew.s_id" :disabled="code_id_checked" style="width: 300px">
            <Select v-model="code_id_check" slot="prepend" style="width: 80px">
                <Option value="0">自动生成</Option>
                <Option value="1">手工填写</Option>
            </Select>
            </Input>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">受理日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleNew.time1" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">信息来源</span></Col>
                <Col span="16">
                <Radio-group v-model="singleNew.source">
                    <Radio label="0"><span>400电话</span></Radio>
                    <Radio label="1"><span>工程中心</span></Radio>
                    <Radio label="2"><span>营销中心</span></Radio>
                    <Radio label="3"><span>客服中心</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">服务类型</span></Col>
                <Col span="16">
                <Radio-group v-model="singleNew.type">
                    <Radio label="0"><span>故障维修</span></Radio>
                    <Radio label="1"><span>巡检</span></Radio>
                    <Radio label="2"><span>应急保障</span></Radio>
                    <Radio label="3"><span>远程协助</span></Radio>
                    <Radio label="4"><span>其他</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">问题描述</span></Col>
                <Col span="18">
                <Input v-model="singleNew.desc1" type="textarea" :rows="4" placeholder="请输入问题描述">
                </Input>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">服务人员</span></Col>
                <Col span="12">
                <addman :men="worker" :type="3"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">处理结果</span></Col>
                <Col span="16">
                <Radio-group v-model="singleNew.result_deal">
                    <Radio label="0"><span>待解决</span></Radio>
                    <Radio label="1"><span>已解决</span></Radio>
                    <Radio label="2"><span>未解决</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">处理描述</span></Col>
                <Col span="18">
                <Input v-model="singleNew.desc2" type="textarea" :rows="4" placeholder="请输入处理描述">
                </Input>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">处理日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleNew.time2" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">收费情况</span></Col>
                <Col span="16">
                <Radio-group v-model="singleNew.charge_if">
                    <Radio label="0"><span>免费</span></Radio>
                    <Radio label="1"><span>收费</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">用户评价</span></Col>
                <Col span="16">
                <Radio-group v-model="singleNew.rating">
                    <Radio label="0"><span>非常满意</span></Radio>
                    <Radio label="1"><span>满意</span></Radio>
                    <Radio label="2"><span>一般</span></Radio>
                    <Radio label="3"><span>不满意</span></Radio>
                    <Radio label="4"><span>未评价</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">客户评价联系人</span></Col>
                <Col span="12">
                <addman :men="cus2" :type="5"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">回访评价</span></Col>
                <Col span="16">
                <Radio-group v-model="singleNew.result_visit">
                    <Radio label="0"><span>非常满意</span></Radio>
                    <Radio label="1"><span>满意</span></Radio>
                    <Radio label="2"><span>一般</span></Radio>
                    <Radio label="3"><span>不满意</span></Radio>
                    <Radio label="4"><span>未回访</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">回访人员</span></Col>
                <Col span="12">
                <addman :men="visitor" :type="4"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">回访日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleNew.time3" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">备注派生</span></Col>
                <Col span="18">
                <Input v-model="singleNew.remark" type="textarea" :rows="4" placeholder="请输入备注">
                </Input>
                </Col>
            </Row>
        </Modal>
        <!--编辑客户-->
        <Modal  v-model="modalEdit" width="400" title="编辑服务单"
                @on-ok="edit" class="new-ivu-modal">
            <Input v-model="singleEdit.s_id" :disabled="code_id_checked" style="width: 300px">
            <Select v-model="code_id_check" slot="prepend" style="width: 80px">
                <Option value="0">自动生成</Option>
                <Option value="1">手工填写</Option>
            </Select>
            </Input>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">受理日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleEdit.time1" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">信息来源</span></Col>
                <Col span="16">
                <Radio-group v-model="singleEdit.source">
                    <Radio label="0"><span>400电话</span></Radio>
                    <Radio label="1"><span>工程中心</span></Radio>
                    <Radio label="2"><span>营销中心</span></Radio>
                    <Radio label="3"><span>客服中心</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">服务类型</span></Col>
                <Col span="16">
                <Radio-group v-model="singleEdit.type">
                    <Radio label="0"><span>故障维修</span></Radio>
                    <Radio label="1"><span>巡检</span></Radio>
                    <Radio label="2"><span>应急保障</span></Radio>
                    <Radio label="3"><span>远程协助</span></Radio>
                    <Radio label="4"><span>其他</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">问题描述</span></Col>
                <Col span="18">
                <Input v-model="singleEdit.desc1" type="textarea" :rows="4" placeholder="请输入问题描述">
                </Input>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">服务人员</span></Col>
                <Col span="12">
                <addman :men="worker" :type="3"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">处理结果</span></Col>
                <Col span="16">
                <Radio-group v-model="singleEdit.result_deal">
                    <Radio label="0"><span>待解决</span></Radio>
                    <Radio label="1"><span>已解决</span></Radio>
                    <Radio label="2"><span>未解决</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">处理描述</span></Col>
                <Col span="18">
                <Input v-model="singleEdit.desc2" type="textarea" :rows="4" placeholder="请输入处理描述">
                </Input>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">处理日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleEdit.time2" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">收费情况</span></Col>
                <Col span="16">
                <Radio-group v-model="singleEdit.charge_if">
                    <Radio label="0"><span>免费</span></Radio>
                    <Radio label="1"><span>收费</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">用户评价</span></Col>
                <Col span="16">
                <Radio-group v-model="singleEdit.rating">
                    <Radio label="0"><span>非常满意</span></Radio>
                    <Radio label="1"><span>满意</span></Radio>
                    <Radio label="2"><span>一般</span></Radio>
                    <Radio label="3"><span>不满意</span></Radio>
                    <Radio label="4"><span>未评价</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">客户评价联系人</span></Col>
                <Col span="12">
                <addman :men="cus2" :type="5"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8">回访评价</span></Col>
                <Col span="16">
                <Radio-group v-model="singleEdit.result_visit">
                    <Radio label="0"><span>非常满意</span></Radio>
                    <Radio label="1"><span>满意</span></Radio>
                    <Radio label="2"><span>一般</span></Radio>
                    <Radio label="3"><span>不满意</span></Radio>
                    <Radio label="4"><span>未回访</span></Radio>
                </Radio-group>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">回访人员</span></Col>
                <Col span="12">
                <addman :men="visitor" :type="4"></addman>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="4"><span class="padding-left-8 padding-top-6">回访日期</span></Col>
                <Col span="12">
                <Date-picker type="date" placeholder="选择日期" v-model="singleEdit.time3" style="width: 200px">
                </Date-picker>
                </Col>
            </Row>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">备注派生</span></Col>
                <Col span="18">
                <Input v-model="singleEdit.remark" type="textarea" :rows="4" placeholder="请输入备注">
                </Input>
                </Col>
            </Row>
            <br>
            <Input v-model="singleEdit.time4" placeholder="占用工时（天）" style="width: 300px">
                <span slot="prepend">占用工时</span>
            </Input>
        </Modal>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .v-servicesall
        position relative
        .new-ivu-modal
            .ivu-modal
                top 10px
        .service-search
            position: absolute;
            top: 1px;
            left: 4px;
            width: 15px;
            height: 30px;
            z-index: 10;
            .service-name
                display: block;
                border none
                border-bottom: 1px dotted rgba(0,0,0,.2);
                background #f5f7f9
                height: 24px;
                width: 7vw
                margin: 8px 2px;
                line-height: 24px;
                text-indent: 14px;
                outline: 0;
                &::placeholder
                    font-weight 700
                    color #657180
</style>

<script type="text/ecmascript">
    import Vue from 'vue'
    import { unixToDate, compareDate } from '../../common/utils/date'
    import addman from '../utils/addman.vue'
    import { mapGetters, mapActions } from 'vuex'
    import base from '../../common/utils/base'
    var cc = console.log;
    export default {
        data(){
            return {
                currentPage:1,
                pageSize:10,
                servicesSource:[],
                services:[],
                columns:[
                    {
                        title: '　',
                        key: 's_id',
                        fixed: 'left',
                        width: 150,
                    },
                    {
                        title:'受理时间',
                        key:'time1',
                        width:150
                    },
                    {
                        title: '信息来源',
                        key: 'source',
                        width: 150,
                        render(row,columns,index){
                            switch (row.source){
                                case "0":
                                    return "400电话"
                                    break;
                                case "1":
                                    return "工程中心"
                                    break;
                                case "2":
                                    return "销售中心"
                                    break;
                                case "3":
                                    return "客服中心"
                                    break;
                                default:
                                    break;
                            }
                        },
                        filters: [
                            {
                                label: '400电话',
                                value: 0
                            },
                            {
                                label: '工程中心',
                                value: 1
                            },
                            {
                                label: '销售中心',
                                value: 2
                            },
                            {
                                label: '客服中心',
                                value: 3
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return row.source == 0
                                    break
                                case 1:
                                    return row.source == 1
                                    break
                                case 2:
                                    return row.source == 2
                                    break
                                case 3:
                                    return row.source == 3
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '服务类型',
                        key: 'type',
                        width: 150,
                        render(row,columns,index){
                            switch (row.source){
                                case "0":
                                    return "故障处理"
                                    break;
                                case "1":
                                    return "巡检"
                                    break;
                                case "2":
                                    return "应急保障"
                                    break;
                                case "3":
                                    return "远程协助"
                                    break;
                                case "4":
                                    return "其他"
                                    break;
                                default:
                                    break;
                            }
                        },
                        filters: [
                            {
                                label: '故障处理',
                                value: 0
                            },
                            {
                                label: '巡检',
                                value: 1
                            },
                            {
                                label: '应急保障',
                                value: 2
                            },
                            {
                                label: '远程协助',
                                value: 3
                            },
                            {
                                label: '其他',
                                value: 4
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return row.source == 0
                                    break
                                case 1:
                                    return row.source == 1
                                    break
                                case 2:
                                    return row.source == 2
                                    break
                                case 3:
                                    return row.source == 3
                                    break
                                case 4:
                                    return row.source == 4
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '问题描述',
                        key: 'desc1',
                        width: 150,
                        render(row,columns,index){
                            return `<i-button type="primary" size="small" @click="desc(${index})">点击查看</i-button>`
                        }
                    },
                    {
                        title: '服务人员',
                        key: 'serviser',
                        width: 150,
                        render(row,column,index){
                            return row.serviser.map(ser=>{
                                return ser.name
                            }).join(',')
                        }
                    },
                    {
                        title: '收费情况',
                        key: 'charge_if',
                        width: 150,
                        render(row,columns,index){
                            switch (row.charge_if){
                                case 0:
                                    return "免费"
                                    break;
                                case 1:
                                    return "收费"
                                    break;
                                default:
                                    break;
                            }
                        },
                        filters: [
                            {
                                label: '免费',
                                value: 0
                            },
                            {
                                label: '收费',
                                value: 1
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return row.charge_if == 0
                                    break
                                case 1:
                                    return row.charge_if == 1
                                    break
                                case 2:
                                    return row.charge_if == 2
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '用户评价',
                        key: 'rating',
                        width: 150,
                        render(row,columns,index){
                            switch (row.rating){
                                case 0:
                                    return `<i-button type="success" size="small" @click="showRating(${index})">非常满意</i-button>`
                                    break;
                                case 1:
                                    return `<i-button type="primary" size="small" @click="showRating(${index})">满意</i-button>`
                                    break;
                                case 2:
                                    return `<i-button type="info" size="small" @click="showRating(${index})">一般</i-button>`
                                    break;
                                case 3:
                                    return `<i-button type="warning" size="small" @click="showRating(${index})">不满意</i-button>`
                                    break;
                                case 4:
                                    return `<i-button size="small" @click="showRating(${index})">未评价</i-button>`
                                    break;
                                default:
                                    break;
                            }
                        },
                        filters: [
                            {
                                label: '非常满意',
                                value: 0
                            },
                            {
                                label: '满意',
                                value: 1
                            },
                            {
                                label: '一般',
                                value: 2
                            },
                            {
                                label: '不满意',
                                value: 3
                            },
                            {
                                label: '未评价',
                                value: 4
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return row.rating == 0
                                    break
                                case 1:
                                    return row.rating == 1
                                    break
                                case 2:
                                    return row.rating == 2
                                    break
                                case 3:
                                    return row.rating == 3
                                    break
                                case 4:
                                    return row.rating == 4
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '处理状态',
                        key: 'result_deal',
                        width: 150,
                        render(row,columns,index){
                            switch (row.result_deal){
                                case 0:
                                    return `<i-button size="small" @click="showDeal(${index})">待解决</i-button>`
                                    break;
                                case 1:
                                    return `<i-button type="success" size="small" @click="showDeal(${index})">已解决</i-button>`
                                    break;
                                case 2:
                                    return `<i-button type="warning" size="small">未解决</i-button>`
                                    break;
                                default:
                                    break;
                            }
                        },
                        filters: [
                            {
                                label: '待解决',
                                value: 0
                            },
                            {
                                label: '已解决',
                                value: 1
                            },
                            {
                                label: '未解决',
                                value: 2
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return row.result_deal == 0
                                    break
                                case 1:
                                    return row.result_deal == 1
                                    break
                                case 2:
                                    return row.result_deal == 2
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '回访情况',
                        key: 'result_visit',
                        width: 150,
                        render(row,columns,index){
                            switch (row.result_visit){
                                case 0:
                                    return `<i-button type="success" size="small" @click="showVisit(${index})">非常满意</i-button>`
                                    break;
                                case 1:
                                    return `<i-button type="primary" size="small" @click="showVisit(${index})">满意</i-button>`
                                    break;
                                case 2:
                                    return `<i-button type="info" size="small" @click="showVisit(${index})">一般</i-button>`
                                    break;
                                case 3:
                                    return `<i-button type="warning" size="small" @click="showVisit(${index})">不满意</i-button>`
                                    break;
                                case 4:
                                    return `<i-button size="small">未回访</i-button>`
                                    break;
                                default:
                                    break;
                            }
                        },
                        filters: [
                            {
                                label: '非常满意',
                                value: 0
                            },
                            {
                                label: '满意',
                                value: 1
                            },
                            {
                                label: '一般',
                                value: 2
                            },
                            {
                                label: '不满意',
                                value: 3
                            },
                            {
                                label: '未回访',
                                value: 4
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return row.result_visit == 0
                                    break
                                case 1:
                                    return row.result_visit == 1
                                    break
                                case 2:
                                    return row.result_visit == 2
                                    break
                                case 3:
                                    return row.result_visit == 3
                                    break
                                case 4:
                                    return row.result_visit == 4
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '占用工时(天)',
                        key: 'time4',
                        width: 100,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        align:"center",
                        width: 240,
                        render (row, column, index) {
                            return `<i-button size="small" @click="goBack(${index})">回溯</i-button>
                                    <i-button type="info" size="small" @click="confirmPrint(${index})">出单</i-button>
                                    <i-button type="primary" size="small" @click="confirmEdit(${index})">编辑</i-button>
                                    <i-button type="error" size="small" @click="confirmRemove(${index})">删除</i-button>`;
                        }
                    }
                ],
                serviceCode:null,
                modalNew : false,
                modalEdit : false,
                singleNew:{
                    source:0,
                    type:0,
                    result_deal:0,
                    result_visit:4,
                    rating:4,
                    charge_if:0,
                },
                singleEdit:{},
                code_id_check:"0",
                index:null,
            }
        },
        computed:{
            ...mapGetters({
               worker:'worker',
               visitor:'visitor',
               cus2:'cus2',
                firstBread : 'firstBread',
                secondBread : 'secondBread',
                thirdBread : 'thirdBread',
            }),
            _services(){
                let end = this.currentPage * this.pageSize
                let start = end - this.pageSize
                return this.services.slice(start,end)
            },
            total(){
                return this.services.length
            },
            code_id_checked(){
                switch (this.code_id_check){
                    case "0": //自动生成
                        return true
                        break
                    case "1": //手工填写
                        return false
                        break
                    default:
                        return
                }
            }
        },
        watch:{
            worker:function (newValue, oldValue) {
                this.singleNew.serviser = newValue
                this.singleEdit.serviser = newValue
            },
            visitor:function (newValue, oldValue) {
                this.singleNew.visitor = newValue
                this.singleEdit.visitor = newValue
            },
            cus2:function (newValue, oldValue) {
                this.singleNew.customer2 = newValue
                this.singleEdit.customer2 = newValue
            },
            serviceCode(){
                this.searchCode()
            },
        },
        methods:{
            ...mapActions([
               'addWorkerTo', 'addVisitorTo', 'addCus2To', 'addRefresh','changeBread'
            ]),
            showRating(index){
                let man = this._services[index].customer2[0].name
                this.$Modal.info({
                    title: '服务评价',
                    content: `客户联系人：${man}`
                })
            },
            showDeal(index){
                let time = this._services[index].time2
                let desc2 = this._services[index].desc2
                let remark = this._services[index].remark
                this.$Modal.info({
                    title: '处理描述',
                    content: `<kbd>处理时间：${time}</kbd><br>
                                <p>处理描述：${desc2}</p>
                                <p>备注：${remark}</p>`
                })
            },
            showVisit(index){
                let man = this._services[index].visitor[0].name
                let time = this._services[index].time3
                this.$Modal.info({
                    title: '回访纪录',
                    content: `<p>回访人：${man}</p>
                               <kbd>回访时间：${time}</kbd><br>`
                })
            },
            desc(index){
              this.$Modal.info({
                  title: '问题描述',
                  content: `${this._services[index].desc1}`
              })
            },
            highLight(){
                var oRow = document.getElementsByClassName('ivu-table-row')
                oRow[this.index].style.cssText = "animation:highlight 5s ease-in"
            },
            confirmPrint(index){
                this.$Modal.confirm({
                    title: '导出服务单',
                    content: '<p>确定导出该服务单？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.print(index)
                    }
                });
            },
            print(index){
                this.$Loading.start();
                let n = this._services[index];
                this.$http.post('services/createTask', n).then(res=>{
                    this.$Loading.finish();
                    location.href = base.url + "services/printTask"
                }, err=>{
                    this.$Loading.error();
                    this.$Message.error('导出失败')
                })
            },
            confirmNew(){
                this.modalNew = !this.modalNew
            },
            confirmEdit(index){

                this.modalEdit = !this.modalEdit
                this.index = index
                this.singleEdit = Object.assign({},this._services[index]);

                this.$store.state.addman.worker = JSON.parse(JSON.stringify(this.singleEdit.serviser))
                this.$store.state.addman.cus2 = JSON.parse(JSON.stringify(this.singleEdit.customer2))
                this.$store.state.addman.visitor = JSON.parse(JSON.stringify(this.singleEdit.visitor))

            },
            confirmRemove(index){
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '<p>确定删除该服务单？</p>',
                    okText: '确定',
                    cancelText: '取消',
                    onOk: () => {
                        this.remove(index)
                    }
                });
            },
            edit(){
                let n = this.singleEdit

                n.customer2_id = n.customer2 ? (n.customer2[0]? n.customer2[0].id : null): null
                n.customer2 = n.customer2 ? n.customer2 : []
                n.visitor = n.visitor ? n.visitor : []

                this.$http.patch('services/'+n.id, n).then(res=>{
                    this.$Message.success('编辑成功')

                    let _index = this.services.indexOf(this._services[this.index])
                    n.charge_if = parseInt(n.charge_if)
                    n.result_deal = parseInt(n.result_deal)
                    n.rating = parseInt(n.rating)
                    n.result_visit = parseInt(n.result_visit)
                    Vue.set(this.services, _index, n)

                    this.addRefresh();

                    this.$nextTick(()=>{
                        this.highLight()
                    })
                }, err=>{
                    this.$Message.error('编辑失败')
                })
            },
            remove(index){
                this.$http.delete('/services/'+this._services[index].id).then(res=>{
                    this.$Message.success('删除成功');
                    var _index = this.services.indexOf(this._services[index])
                    this.services.splice(_index, 1);
                }, err=>{
                    this.$Message.error('删除失败');
                    err.status
                })
            },
            add(){
                let n = this.singleNew
                n.s_id = this.code_id_check==="0" ?  null : n.s_id
                if(n.customer2){
                    n.customer2_id = n.customer2[0].id
                }
                this.$http.post('services', n).then(res=>{
                    this.$Message.success('添加成功');

                }, err=>{
                    this.$Message.error('添加失败');
                })
            },
            searchCode:_.debounce(function () {
                  if(!this.serviceCode){
                      this.services = this.servicesSource
                      return
                  }
                  this.$http.get('/services/search/'+this.serviceCode).then(res=>{
                      this.services = res.data
                  })
            },500),
            changePage(val){
                this.currentPage = val;

            },
            goBack(index){
                let id = this._services[index].contract_id
                this.$router.push({ name : 'cusservices', params: { contractId: id } })
            }
        },
        mounted(){
            this.$Loading.start();
            this.$http.get('/services').then(res=>{
                this.$Loading.finish();
                this.servicesSource = res.data
                this.services = this.servicesSource
                let bread = {
                    first:{
                        name : '客服',
                        href : '???'
                    },
                    second : {
                        name:  "所有服务记录",
                        href : '#'
                    },
                    third : {}
                }
                this.changeBread(bread)
            })
        },
        components:{
            addman
        }
    }
</script>
