import Vue from 'vue'
import Router from 'vue-router'

//引入组件
//登陆组件
import login from '#/login/login'
//用户组件
import users from '#/users/users'
import roles from '#/users/roles'
import perms from '#/users/permissions'
//客服组件
import contracts from '#/contracts/contracts.vue'
import discusses from '#/contracts/discusses.vue'
import services from '#/contracts/services.vue'
import customers from '#/contracts/customers.vue'
import customer2s from '#/customer2s/customer2s.vue'

import contractsall from '#/contracts/contractsall.vue'
import servicesall from '#/contracts/servicesall.vue'

//生产组件
import steps from '#/productions/steps.vue'


//测试组件
import team from '#/teambition/test'

Vue.use(Router)

export default new Router({
  routes: [
      //teambitionTest
      // {name:'team', path:'/team', component:team},

      //login
      {name:'login', path:'/login', component:login},
      //users
      {name:'users', path:'/users', component:users},
      {name:'roles', path:'/roles', component:roles},
      {name:'perms', path:'/perms', component:perms},

      //production
      {name:'customers',path:'/customers', component:customers},
      {name:'customer2s', path:'/customer2s', component:customer2s},
      {name:'cuscontract', path:'/contracts/:id', component:contracts}, //用于展示客户下的合同
      {name:'cusservices', path:'/services/:contractId', component:services},  //用于展示合同下的服务单
      {path:'/discusses', component:discusses},
      {name:'contracts', path:'/contracts', component:contractsall},
      {name:'services', path:'/services', component:servicesall},
      {name:'steps', path:'/steps',component:steps}
  ]
})
