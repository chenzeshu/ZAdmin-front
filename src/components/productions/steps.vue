<template>
    <div class="v-pro-steps">
        <p>当前正在进行第 {{ current + 1 }} 步</p>
        <br>
        <Steps :current="current">
            <Step title="步骤1"></Step>
            <Step title="步骤2"></Step>
            <Step title="步骤3"></Step>
            <Step title="步骤4"></Step>
            <Step title="步骤5"></Step>
            <Step title="步骤6"></Step>
        </Steps>
        <br>
        <i-button type="primary" @click="next">下一步</i-button>
        <hr>
        <br>
        <Steps :current="current2" direction="vertical">
            <Step title="步骤一" content="这里是该步骤的描述信息"></Step>
            <Step title="步骤二" content="这里是该步骤的描述信息"></Step>
            <Step title="步骤三" content="这里是该步骤的描述信息"></Step>
            <Step title="步骤四" content="这里是该步骤的描述信息"></Step>
        </Steps>
        <i-button type="primary" @click="next2">下一步</i-button>
    </div>
</template>

<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">

</style>

<script type="text/ecmascript">
    import Vue from 'vue'
    var cc = console.log;
    export default {
        data () {
            return {
                current: 0,
                current2: 0,
            }
        },
        methods: {
            next () {
                if (this.current == 5) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            },
            next2 () {
                if (this.current2 == 3) {
                    this.current2 = 0;
                } else {
                    this.current2 += 1;
                }
            }
        }
    }
</script>
