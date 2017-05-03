<template>
    <div class="v-roles">
        <!--添加-->
        <div class="role-plus" @click="confirmNew()">
            <Icon type="plus-circled" :size="16"></Icon>
        </div>
        <!--列表-->
        <Table stripe border :columns="columns" :data="_roles"></Table>
        <!--分页-->
        <div style="margin: 10px; overflow: hidden">
            <div style="float: right;">
                <Page :current="currentPage" :total="total" :pageSize="pageSize"
                      @on-change="changePage" simple></Page>
            </div>
        </div>
        <!--新增角色-->
        <Modal  v-model="modalNew" width="400" title="新增角色"
                         @on-ok="add">
        <Input v-model="singleNew.name" placeholder="角色英文码" style="width: 300px">
        <span slot="prepend">角色英文</span>
        </Input>
        <br>
        <Input v-model="singleNew.display_name" placeholder="角色名称" style="width: 300px">
        <span slot="prepend">角色名称</span>
        </Input>
        <br>
        <Checkbox-group v-model="singleNew.perms">
            <Checkbox :label="perm.id" v-for="perm in perms" :key="perm.id">
                <span>{{ perm.display_name }}</span>
            </Checkbox>
        </Checkbox-group>
        <br>
        <Row>
            <Col span="2"><span class="padding-left-8 padding-top-6">角色描述</span></Col>
            <Col span="18">
            <Input v-model="singleNew.description" type="textarea" :rows="4" placeholder="请输入角色描述">
            </Input>
            </Col>
        </Row>
    </Modal>
        <!--修改角色-->
        <Modal  v-model="modalEdit" width="400" title="修改角色"
                @on-ok="edit">
            <Input v-model="singleEdit.name" placeholder="角色英文码" style="width: 300px">
            <span slot="prepend">角色英文</span>
            </Input>
            <br>
            <Input v-model="singleEdit.display_name" placeholder="角色名称" style="width: 300px">
            <span slot="prepend">角色名称</span>
            </Input>
            <br>
            <Checkbox-group v-model="singleEdit.perms">
                <Checkbox :label="perm.id" v-for="perm in perms" :key="perm.id">
                    <span>{{ perm.display_name }}</span>
                </Checkbox>
            </Checkbox-group>
            <br>
            <Row>
                <Col span="2"><span class="padding-left-8 padding-top-6">角色描述</span></Col>
                <Col span="18">
                <Input v-model="singleEdit.description" type="textarea" :rows="4" placeholder="请输入角色描述">
                </Input>
                </Col>
            </Row>
        </Modal>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .v-roles
        position relative
        .role-plus
            position: absolute;
            top: 3px;
            left: 3px;
            width: 20px;
            height: 30px;
            color: #39f;
            z-index: 10;
</style>

<script type="text/ecmascript">
    import {loadFromLocal, saveToLocal} from '@/common/utils/store'
    var cc = console.log;
    export default {
        data(){
            return {
                currentPage:loadFromLocal('currentPage', 1),
                pageSize:10,
                rolesSource:[],
                roles:[],
                perms:[],
                columns:[
                    {
                        title: '角色名',
                        key: 'display_name',
                        fixed: 'left',
                        width:150,
                    },
                    {
                        title: '角色描述',
                        key: 'description',
                        width:250,
                    },
                    {
                        title: '拥有此角色者',
                        key: 'user',
                        width:350,
                        render(row,column,index){
                            if(!row.users)
                                return
                            return row.users.map(user=>{
                                return `<i-button type="ghost" size="small">${user.name}</i-button>`
                            }).join('　')
                        }
                    },
                    {
                        title: '权限详情',
                        key: 'permission',
                        width:650,
                        render(row, column, index){
                            return row.perms.map(perm=>{
                                return `<i-button type="ghost" size="small">${perm.display_name}</i-button>`
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
                                    <i-button type="primary" size="small" @click="confirmEdit(${index})">编辑角色</i-button>
                                    <i-button type="error" size="small" @click="confirmRemove(${index})">删除</i-button>`;
                        }
                    }
                ],
                modalNew:false,
                modalEdit:false,
                singleNew:{
                    perms:[]
                },
                singleEdit:{},
                index:loadFromLocal('index', null),
            }
        },
        computed:{
          total(){
              return this.roles.length
          },
          _roles(){
              let end = this.currentPage * this.pageSize
              let start =  end - this.pageSize
              return this.roles.slice(start,end)
          }
        },
        methods:{
          confirmNew(index){
                this.modalNew = true;
            },
          confirmEdit(index){

                this.modalEdit = true;
                this.singleEdit = Object.assign({}, this._roles[index])
                this.index = index

                if(this.singleEdit.perms){
                    this.singleEdit.perms = this.singleEdit.perms.map(perm=>{
                        return perm.id
                    })
                }

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
              this.$http.post('roles', n).then(res=>{
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
                this.$http.patch('roles/'+n.id, n).then(res=>{
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
                var id = this._roles[index].id
                this.$http.delete('roles/'+id).then(res=>{
                    this.$Message.success('删除成功')
                    let _index = this.roles.indexOf(this._roles[index])
                    this.roles.splice(_index, 1)
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
            changePage(val){
                this.currentPage = val;
            },
        },
        mounted() {
            var self = this

            function getRoles(){
                return self.$http.get('roles')
            }

            function getPerms(){
                return self.$http.get('perms')
            }

            this.$http.all([getRoles(),getPerms()]).then(this.$http.spread((res1,res2)=> {
                this.rolesSource = res1.data
                this.roles = res1.data
                this.perms = res2.data

                this.$nextTick(()=>{
                    this.highLight()
                })
            }))

            this.$http.get('roles').then(res=>{

            })
        }
    }
</script>
