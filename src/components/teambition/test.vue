<template>
    <div class="v-test">
        <button @click="getCode">点我申请code</button>
        <button @click="getToken">点我获取token</button>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">

</style>

<script type="text/ecmascript">
    var cc = console.log;
    export default {
        data(){
            return {
                client_key : "bcd78a00-2654-11e7-b3d5-dfbc5b469dfb",
                client_secret : "fcb083e9-4ca6-4eba-8668-aed9a9a1406e",
                grant_type : "code",
                code_uri : "https://account.teambition.com/oauth2/authorize?client_id=bcd78a00-2654-11e7-b3d5-dfbc5b469dfb&redirect_uri=http://back"
            }
        },
        //思路：（1）触发需要资源服务器授权的操作()，判断本地缓存是否存在code：存在，getToken()；不存在，则进入第（3）步；
        //      （2）判断本地缓存是否存在access_token与refresh_token，两者缺一，需要重新申请，跳到第（3）步，若存在，跳到第（5）步；
        //       (3) 触发getCode()，请求用户再次授权获得code，code被存入数据库，页面跳回用户申请前页面，进入第（4）步；
        //      （4）此时用户如果再次触发需要资源服务器授权的操作()，getToken()；
        //      （5）若都已存在，请求判断access_token是否过期，若过期，使用refresh_token请求，若refresh_token无效或过期，回到第（3）步;
        //todo 以上只是测试逻辑，真正的逻辑一定是用户授权同时，将当前路由或目的路由添加到status参数，所有步骤不需要用户再次触发操作，直接进入原有下一步操作。
        methods:{
            getCode(){
                window.location.href = this.code_uri
            },
            getToken(){
                let data = {
                    client_id : this.client_key,
                    client_secret : this.client_secret,
                    grant_type : this.grant_type
                }
                this.$http.get('http://back.app/code').then(res=>{
                    data.code = res.data
                    localStorage.setItem('code',res.data)
                    this.$http.post('https://account.teambition.com/oauth2/access_token', data).then(res=>{
                        localStorage.setItem('access_token', res.data.access_token)
                        localStorage.setItem('refresh_token', res.data.refresh_token)
                        localStorage.setItem('code', null)
                    })
                });

            }
        },
        mounted() {
        }
    }
</script>
