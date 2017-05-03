<template>
  <div class="v-app">
    <div v-if="logined">
          <!--一级导航-->
        <Menu mode="horizontal" :theme="theme1" active-name="1" >
              <div class="layout-logo"></div>
              <div class="layout-auth touch" @click="showAuth">
                    <div class="auth-name">
                        Hi, {{ username }}
                    </div>
                    <div class="auth-content text-center" v-if="authFlag">
                      <div class="auth-content-sons touch" @click="logout">
                        注销
                      </div>
                    </div>
              </div>
          </Menu>
          <!--登陆后内容-->
        <div class="v-app-content">
          <Row class="layout">
            <div class="layout-nav">
              <Menu :theme="theme2" :open-names="['3']" active-name="3-1" accordion>
                <!--合同-->
                <Submenu name="1">
                  <template slot="title">
                    <Icon type="ios-paper"></Icon>
                    合同
                  </template>
                  <router-link to="/contracts">
                    <Menu-item name="1-1">合同</Menu-item>
                  </router-link>
                  <router-link to="/discusses">
                    <Menu-item name="1-2">讨论记录</Menu-item>
                  </router-link>
                  <Menu-item name="1-3">举报管理</Menu-item>
                </Submenu>
                <!--用户/权限-->
                <Submenu name="2">
                  <template slot="title">
                    <Icon type="ios-people"></Icon>
                    用户管理
                  </template>
                  <router-link to="/users">
                  <Menu-item name="2-1">用户管理</Menu-item>
                  </router-link>
                  <router-link to="/roles">
                  <Menu-item name="2-2">角色管理</Menu-item>
                  </router-link>
                  <router-link to="/perms">
                  <Menu-item name="2-3">权限管理</Menu-item>
                  </router-link>
                  <Menu-item name="2-4">工时统计</Menu-item>
                </Submenu>
                <!--客服-->
                <Submenu name="3">
                  <template slot="title">
                    <Icon type="stats-bars"></Icon>
                    客服模块
                  </template>
                  <!--<Menu-group title="服务">-->
                  <router-link to="/customers">
                    <Menu-item name="3-1">客户总览</Menu-item>
                  </router-link>
                  <router-link to="/customer2s">
                    <Menu-item name="3-2">联系人总览</Menu-item>
                  </router-link>
                  <router-link to="/contracts">
                    <Menu-item name="3-3">合同总览</Menu-item>
                  </router-link>
                  <router-link to="/services">
                    <Menu-item name="3-4">服务单总览</Menu-item>
                  </router-link>
                  <!--</Menu-group>-->
                </Submenu>
                <!--生产管理-->
                <Submenu name="4">
                  <template slot="title">
                    <Icon type="ios-people"></Icon>
                    生产管理
                  </template>
                  <router-link to="/steps">
                    <Menu-item name="4-1">生产进度</Menu-item>
                  </router-link>
                  <Menu-item name="4-2">生产细节</Menu-item>
                </Submenu>
              </Menu>
            </div>
              <!--实际内容-->
            <div class="layout-right">
                <!--面包屑-->
              <div class="layout-breadcrumb">
                <Breadcrumb>
                  <Breadcrumb-item href="#" v-if="firstBread">{{firstBread.name}}</Breadcrumb-item>
                  <Breadcrumb-item href="#" v-if="secondBread">{{secondBread.name}}</Breadcrumb-item>
                  <!--<Breadcrumb-item v-if="thirdBread.name">{{thirdBread.name}}</Breadcrumb-item>-->
                </Breadcrumb>
              </div>
              <div class="layout-content">
                <transition name="foo">
                  <router-view></router-view>
                </transition>
              </div>
            </div>
          </Row>
        </div>
    </div>
      <!--未登陆的首页-->
    <div v-else>
        <login></login>
    </div>
  </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
  a
    color:#657180
  .v-app
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    height 100vh
    .layout-logo
      width: 100px;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
      left: 20px;
    .layout-nav
      width: 420px;
      margin: 0 auto;
    .layout-auth
      position relative
      box-sizing border-box
      float right
      color #fff
      padding: 0 20px 0 10px;
      .auth-name
        font-size 16px
      .auth-content
        position: absolute;
        top: 59px;
        right: 19px;
        border: 1px solid #a7b6ca;
        box-sizing: border-box;
        width: 92px;
        line-height: 32px;
        font-size: 16px;
        border-top: none;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        z-index 50
        .auth-content-sons
          color #000
    .v-app-content
      min-height: 200px;
      margin: 15px;
      overflow: hidden;
      background: #fff;
      height 90vh
      border-radius: 4px;
      .layout
        display:flex
        .layout-nav
          flex 0 0 240px
          width 240px
        .layout-right
          top 10px
          left 240px
          flex 1
          margin 10px 0 10px 5px
          padding 0 15px
          .layout-content
            width calc(96vw - 240px)
            margin 10px 0 0 -5px
            padding 10px 0
            border-top 1px solid rgba(0,0,0,.1)
          .foo-enter-active,foo-leave-active
            transition all .6s ease-in
          .foo-enter,.foo-leave-active
            opacity:0;
</style>

<script>
  import login from '#/login/login'
  import base from './common/utils/base'
  import {loadFromLocal, saveToLocal} from '@/common/utils/store'
  import {mapGetters, mapActions} from 'vuex'
  var cc = console.log;
export default {
  name: 'app',
    data(){
      return {
          theme1:'primary',
          theme2: 'light',
          authFlag:false
      }
    },
    computed:{
        ...mapGetters({
            logined : 'logined',
            username : 'username',
            firstBread : 'firstBread',
            secondBread : 'secondBread',
            thirdBread : 'thirdBread',
        })
    },
    methods:{
        ...mapActions([
           'logout', 'getUsername'
        ]),
        showAuth(){
          this.authFlag = !this.authFlag
        },
        autoLogin(){
            const postData = {
                // grant_type: 'password',
                grant_type: 'refresh_token',
                client_id: 2,
                client_secret: this.$store.state.client_secret,
                refresh_token: loadFromLocal("refresh_token"),
                scope: ''
            }
            // 发送POST请求，向认证服务器申请 token

//            this.$http.post('http://back.app/oauth/token', postData)
            this.$http.post(base.url+'oauth/token', postData).then(response => {
                    this.$http.defaults.headers.common = {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + response.data.access_token, //细节：Bearer后面有个空格
                    }
                    this.$Message.success('自动登陆成功')
                    this.$store.state.logined = true
                    saveToLocal('logined',true)
                    saveToLocal('access_token', response.data.access_token)
                    saveToLocal('refresh_token', response.data.refresh_token)
                }, err=>{
                    this.$Message.error('登陆过期，请重新登陆')
                    saveToLocal('refresh_token', null)
                    this.logout()
                })
        }
    },
    components:{
        login
    },
    beforeRouterEnter(to, from ,next){
        //好像没起作用，但是却也有用？

    },
    created(){
        if(loadFromLocal("access_token") && loadFromLocal('logined')){
            this.$http.defaults.headers.common = {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + loadFromLocal("access_token"), //细节：Bearer后面有个空格
            }
            this.$http.get('/user').then(res=>{
                this.$Message.success('自动登陆')
                this.getUsername(res.data.name)
            },err=>{
                this.$Message.success('access登陆过期')
                this.logout()
                this.$router.go(0)
            })
        }else if(loadFromLocal('refresh_token')){
            this.autoLogin();
        }else{
            this.logout()
        }
    }
}
</script>

