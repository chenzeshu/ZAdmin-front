<template>
    <div class="v-users">
        <!--搜索-->
        <div class="users-search">
            <input v-model="userName" placeholder="用户名称" class="user-name">
        </div>
        <!--列表-->
        <Table stripe border :columns="columns" :data="_users"></Table>
        <!--分页-->
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :current="currentPage" :total="total" :pageSize="pageSize"
                      @on-change="changePage" simple></Page>
            </div>
        </div>
        <!--修改用户权限-->
        <Modal  v-model="modalEdit" width="400" title="编辑权限"
                @on-ok="edit">
            <Radio-group v-model="roleid">
                <Radio :label="role.id" v-for="role of roles" :key="role.id">
                    <span>{{ role.display_name }}</span>
                </Radio>
                <Radio label="999">
                    <span>无权限</span>
                </Radio>
            </Radio-group>
        </Modal>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .v-users
        position relative
        .users-search
            position: absolute;
            top: 1px;
            left: 10px;
            width: 20px;
            height: 30px;
            z-index: 10;
            .user-name
                display: block;
                border none
                border-bottom: 1px dotted rgba(0,0,0,.2);
                background #f5f7f9
                height: 24px;
                width: 7vw
                margin: 8px 6px;
                line-height: 24px;
                text-indent: 16px;
                outline: 0;
                &::placeholder
                    font-weight 700
                    color #657180

</style>

<script type="text/ecmascript">
    import {loadFromLocal, saveToLocal} from '@/common/utils/store'
    var cc = console.log;
    export default {
        data(){
            return {
                userName:null,
                usersSource:[],
                users:[],
                roles:[],
                roleid:999,
                currentPage:loadFromLocal('currentPage', 1),
                pageSize:10,
                columns:[
                    {
                        title: '　',
                        key: 'name',
                        fixed: 'left',
                    },
                    {
                        title: '邮箱',
                        key: 'email',
                    },
                    {
                        title: '联系方式',
                        key: 'phone',
                    },
                    {
                        title: '创建时间',
                        key: 'created_at',
                    },
                    {
                        title: '用户角色',
                        key: 'role',
                        render(row, column, index){
                            return row.roles.map(role=>{
                               return  ` <i-button type="primary">${role.display_name}</i-button>`
                            }).join('　')
                        },
                        filters: [
                            {
                                label: '超管',
                                value: 0
                            },
                            {
                                label: '客服',
                                value: 1
                            },
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            switch (value){
                                case 0:
                                    return JSON.stringify(row.roles).indexOf('超级管理员') > -1
                                    break
                                case 1:
                                    return JSON.stringify(row.roles).indexOf('客服管理员') > -1
                                    break
                                default:
                                    return;
                            }
                        },
                    },
                    {
                        title: '用户权限',
                        key: 'permission',
                        width:300,
                        render(row, column, index){
                            return row.roles.map(role=>{
                                return  role.perms.map(perm=>{
                                    return `<i-button type="ghost" size="small">${perm.display_name}</i-button>`
                                }).join('　')
                            }).join('　')
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed:'right',
                        width:210,
                        render (row, column, index) {
                            return `
                                    <i-button type="primary" size="small" @click="confirmEdit(${index})">编辑权限</i-button>
                                    <i-button type="error" size="small" @click="confirmRemove(${index})">删除</i-button>`;
                        }
                    }
                ],
                modalInfo:false,
                modalEdit:false,
                index:loadFromLocal('index', null),
            }
        },
        computed:{
            total(){
               return this.users.length
            },
          _users(){
              let end = this.currentPage * this.pageSize
              let start =  end - this.pageSize
              return this.users.slice(start,end)
          }
        },
        methods:{
            changePage(val){
                this.currentPage = val;
            },
            confirmEdit(index){
                this.modalEdit = true
                this.index = index
                this.roleid = this._users[index].roles[0] ? this._users[index].roles[0].id : 999
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
            edit(){
                var id = this._users[this.index].id
                var data = {
                    roleid: this.roleid
                }

                this.$http.patch('users/'+id, data).then(res=>{
                    this.$Message.success('修改成功')
                    saveToLocal('index',this.index);
                    saveToLocal('currentPage',this.currentPage);
                    setTimeout(()=>{
                        this.$router.go(0)
                    }, 500)
                }, err=>{
                    this.$Message.error('修改失败')
                })
            },
            remove(index){
                var id = this._users[index].id
                this.$http.delete('users/'+id).then(res=>{
                    this.$Message.success('删除成功')
                    let _index = this.users.indexOf(this._users[index])
                    this.users.splice(_index, 1)
                }, err=>{
                    this.$Message.success('删除失败')
                })

            },
            highLight(){
                if(!this.index)
                    return;
                var oRow = document.getElementsByClassName('ivu-table-row')
                oRow[this.index].style.cssText = "animation:highlight 5s ease-in"
                saveToLocal('index',null)
            },
        },
        mounted() {
            var self = this
            function getUsers(){
                return self.$http.get('users')
            }

            function getRoles(){
                return self.$http.get('roles')
            }

            this.$http.all([getUsers(),getRoles()]).then(this.$http.spread((res1,res2)=> {
                this.usersSource = res1.data
                this.users = this.usersSource
                this.roles = res2.data

                this.$nextTick(()=>{
                    this.highLight()
                    })
            }))
        }
    }
</script>
