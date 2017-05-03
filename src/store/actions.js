import * as types from './mutation-types'


//----------------------------------登陆-------------------------------------//
export const login = ({commit}, payload)=>{
    commit(types.LOGIN, {payload})
}

export const logout = ({commit})=>{
    commit(types.LOGOUT)
}

export const getUsername  = ({commit}, payload)=>{
    commit(types.GETUSERNAME, {payload})
}
//----------------------------------面包屑----------------------------------//
export const changeBread = ({commit}, payload) =>{
    commit(types.CHANGEBREAD, {payload})
}

//----------------------component : addman&addcompany-------------------------//
export const addPmTo = ({commit}, payload)=>{
    commit(types.ADD_PM_TO, {payload})
}

export const addTmTo = ({commit}, payload)=>{
    commit(types.ADD_TM_TO, {payload})
}

export const addWorkerTo = ({commit}, payload)=>{
    commit(types.ADD_WORKER_TO, {payload})
}

export const addVisitorTo = ({commit}, payload)=>{
    commit(types.ADD_VISITOR_TO, {payload})
}

export const addCusTo = ({commit}, payload)=>{
    commit(types.ADD_CUS_TO, {payload})
}

export const addCus2To = ({commit}, payload)=>{
    commit(types.ADD_CUS2_TO, {payload})
}

export const addProfessionTo = ({commit}, payload)=>{
    commit(types.ADD_PROFESSION_TO, {payload})
}

export const addRefresh = ({commit})=>{
    commit(types.ADD_REFRESH)
}
//----------------------component : addman-------------------------//