<template>
    <div class="v-perms">
        <!--列表-->
        <Table stripe border :columns="columns" :data="_perms"></Table>
        <!--修改权限-->
        <Modal  v-model="modalEdit" width="400" title="修改权限"
                @on-ok="edit">
            <Input v-model="singleEdit.name" placeholder="权限英文码" style="width: 300px">
            <span slot="prepend">角色英文</span>
            </Input>
            <br>
            <Input v-model="singleEdit.display_name" placeholder="权限名称" style="width: 300px">
            <span slot="prepend">角色名称</span>
            </Input>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">权限描述</span></Col>
                <Col span="18">
                <Input v-model="singleEdit.description" type="textarea" :rows="4" placeholder="请输入权限描述">
                </Input>
                </Col>
            </Row>
        </Modal>
        <!--分页-->
        <div style="margin: 10px; overflow: hidden">
            <div style="float: right;">
                <Page :current="currentPage" :total="total" :pageSize="pageSize"
                      @on-change="changePage" simple></Page>
            </div>
        </div>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">

</style>

<script type="text/ecmascript">
    import {loadFromLocal, saveToLocal} from '@/common/utils/store'
    var cc = console.log;
    export default {
        data(){
            return {
                currentPage:loadFromLocal('currentPage', 1),
                pageSize:10,
                permsSource:[],
                perms:[],
                columns:[
                    {
                        title: '权限名',
                        key: 'display_name',
                        fixed: 'left',
                        width:150,
                    },
                    {
                        title: '权限描述',
                        key: 'description',
                        width:300
                    },
                    {
                        title: '拥有此权限者',
                        key: 'user',
                        render(row,column,index){
                            return row.roles.map(role=>{
                                return role.users.map(user=>{
                                    return `<i-button type="ghost" size="small">${user.name}</i-button>`
                                }).join('　')
                            }).join('　')
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        fixed: 'right',
                        width:210,
                        render (row, column, index) {
                            return `
                                    <i-button type="primary" size="small" @click="confirmEdit(${index})">编辑权限</i-button>
                                    <i-button type="error" size="small" @click="confirmRemove(${index})">删除</i-button>`;
                        }
                    }
                ],
                modalNew:false,
                modalEdit:false,
                singleNew:{},
                singleEdit:{},
                index:loadFromLocal('index', null)
            }
        },
        computed:{
            total(){
                return this.perms.length
            },
            _perms(){
                let end = this.currentPage * this.pageSize
                let start =  end - this.pageSize
                return this.perms.slice(start,end)
            }
        },
        methods:{
            confirmNew(index){
                this.modalNew = true;
            },
            confirmEdit(index){

                this.modalEdit = true;
                this.singleEdit = Object.assign({}, this._perms[index])
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
                var n = this.singleNew
                this.$http.post('perms', n).then(res=>{
                    this.$Message.success('新增成功')
                    saveToLocal('index', this.index)
                    setTimeout(()=>{
                        this.$router.go(0)
                    }, 500)
                }, err=>{
                    this.$Message.error('新增失败，请联系管理员')
                    this.index = null
                })
            },
            edit(){
                var n = this.singleEdit
                this.$http.patch('perms/'+n.id, n).then(res=>{
                    this.$Message.success('修改成功')
                    saveToLocal('index', this.index)
                    setTimeout(()=>{
                        this.$router.go(0)
                    }, 500)
                }, err=>{
                    this.$Message.error('修改失败，请联系管理员')
                    this.index = null
                })
            },
            remove(index){
                var id = this._perms[index].id
                this.$http.delete('perms/'+id).then(res=>{
                    this.$Message.success('删除成功')
                    let _index = this.perms.indexOf(this._perms[index])
                    this.perms.splice(_index, 1)
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
            this.$http.get('perms').then(res=>{
                this.permsSource = res.data
                this.perms = res.data
                this.$nextTick(()=>{
                    this.highLight()
                })
            })
        }
    }
</script>
