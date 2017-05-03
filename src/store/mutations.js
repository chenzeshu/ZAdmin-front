import * as types from './mutation-types'
import base from '../common/utils/base'
import axios from 'axios'
import {loadFromLocal,saveToLocal} from '@/common/utils/store'
var cc = console.log


export default {
    [types.LOGIN](state, payload){
        var payload = payload.payload
        // 密码模式相关参数
        const postData = {
            grant_type: 'password',
            client_id: 2,
            client_secret: state.client_secret,
            username: payload.username,
            password: payload.password,
            scope: ''
        }
        // 发送POST请求，向认证服务器申请 token

        // axios.post('http://back.app/oauth/token', postData)
        axios.post(base.url+'oauth/token', postData).then(response => {
                axios.defaults.headers.common = {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + response.data.access_token, //细节：Bearer后面有个空格
                }
                state.logined = true
                saveToLocal('logined',true)
                saveToLocal('access_token', response.data.access_token)
                saveToLocal('refresh_token', response.data.refresh_token)
                axios.get('/user').then(res=>{
                    state.username = res.data.name
                })
            })
    },

    [types.LOGOUT](state){
      state.logined = false
      saveToLocal('logined',false)
      saveToLocal('access_token', null)
    },

    //bread
    [types.CHANGEBREAD](state, payload){

        payload = payload.payload
       let first = Object.keys(payload.first).length >0 ? payload.first : null
       let second = Object.keys(payload.second).length >0 ? payload.second : null
       let third = Object.keys(payload.third).length >0 ? payload.third : null

       state.firstBread = first ? first : null
       state.secondBread = second ? second : null
       state.thirdBread = third ? third : null
    },

    [types.GETUSERNAME](state, payload){
        state.username = payload.payload
    },

    [types.ADD_PM_TO](state, payload){
        state.addman.pm = payload
    },

    [types.ADD_TM_TO](state, payload){
        state.addman.tm = payload
    },

    [types.ADD_WORKER_TO](state, payload){
        state.worker.tm = payload
    },

    [types.ADD_VISITOR_TO](state, payload){
        state.addman.visitor = payload
    },

    [types.ADD_CUS_TO](state, payload){
        state.addman.cus = payload
    },

    [types.ADD_CUS2_TO](state, payload){
        state.addman.cus2 = payload
    },

    [types.ADD_PROFESSION_TO](state, payload){
        state.addman.profession = payload
    },

    [types.ADD_REFRESH](state){
        state.addman = {
            pm : [],
            tm : [],
            worker : [],
            visitor : [],
            cus : {},
            cus2 : [],
            profession : [],
        }
    }
}
