export const controlTest = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if(e && e.ctrlKey){ //按下ctrl则不触发本方法
        return
    }
}