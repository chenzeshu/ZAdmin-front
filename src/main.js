// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import _ from 'lodash'
import base from './common/utils/base'
import router from './router'
import store from './store'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '@/common/stylus/index.styl'
import {loadFromLocal} from '@/common/utils/store'
Vue.use(iView)

//axios的设置，api不会触发csrf
axios.defaults.baseURL = base.url+'api/v1';
// axios.defaults.baseURL = 'http://back.app/api/v1';
axios.defaults.headers.common = {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + loadFromLocal('access_token', null) //细节：Bearer后面有个空格
}
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

// router.push({name:'cuscontract', params:{id:3}})
router.push({name:'contracts'})
// router.push({name:'team'})