import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import * as actions from './actions'
import {loadFromLocal} from '@/common/utils/store'

Vue.use(Vuex)

const state = {
    addman:{ //用于承载addman所传输的所有人、单位、行业等信息
        pm : [],
        tm : [],
        worker : [],
        visitor : [],
        cus : {},
        cus2 : [],
        profession : [],
    },
    client_secret:"UYiiXqNWemmTZuXqtTUjBa6vuaDw9daY22LGfiyS",  //开发环境下homesteaad的back.app的clientid
    // client_secret:"MmEYIQfQCfrLI9j3OVoGohoXcfoi5xW5ve0eCkyf",  //222.222.228.9的front的clentid
    access_token : null,  //放置刷新后vuex初始化导致access_token丢失
    username:null,
    logined:false,
    firstBread : {
        name:null,
        href:null,
    },
    secondBread : {
        name:null,
        href:null,
    },
    thirdBread : {
        name:null,
        href:null,
    },
}
state.logined = loadFromLocal('logined',false)
state.access_token = loadFromLocal('access_token', null)

const debug = process.env.NODE_ENV !=='production'

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})