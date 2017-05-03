//authentic
export const logined = state => state.logined
export const username = state =>state.username

//bread
export const firstBread = state => {return {name : state.firstBread.name, href : state.firstBread.href}}
export const secondBread = state => {return {name : state.secondBread.name, href : state.secondBread.href}}
export const thirdBread = state => {return {name : state.thirdBread.name, href : state.thirdBread.href}}

//addman & addcompany
export const pm = state => state.addman.pm
export const tm = state => state.addman.tm
export const worker = state => state.addman.worker
export const visitor = state => state.addman.visitor
export const cus = state => state.addman.cus
export const cus2 = state => state.addman.cus2
export const profession = state => state.addman.profession


