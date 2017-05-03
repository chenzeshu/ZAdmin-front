import {loadFromLocal} from './store'

export default {
    url : "http://back.app/",
    // url : "http://222.222.228.9:8887/",
    headers:{
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + loadFromLocal('access_token', null) //细节：Bearer后面有个空格
    },
    contractsUploadAction: "http://back.app/api/v1/contracts/upload",
}
