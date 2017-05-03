<template>
<div class="v-login">
    <div class="text-center">
        <h1>云卫通客服</h1>
        <br>
        <br>
        用户名<input type="text" v-model="username">
        密码 <input type="password" v-model="password">
        <br>
        <br>
        <button @click="attempToLogin">login</button>
    </div>

</div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    h1
      font-size 2em!important
</style>

<script type="text/ecmascript">
    import {mapActions} from 'vuex'
    var cc = console.log;
    export default {
        data(){
            return {
                username:null,
                password:null,
            }
        },
        methods:{
            ...mapActions([
                'login'
            ]),
            attempToLogin(){
                var payload = {
                    username:this.username,
                    password:this.password
                }
                this.login(payload)
            }
        },
        mounted() {

        }
    }
</script>
