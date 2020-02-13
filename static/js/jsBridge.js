var jsBridge = (function(){
    /**
     * 判断用户手机系统
     */
    var isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1;
    var isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    var checkPlatform = { isAndroid:isAndroid, isIOS:isIOS };

    console.log("checkPlatform:",checkPlatform)
    var common = function(){};

    common.prototype = {
        // 获取用户TOKEN
        getToken:function(){

            return new Promise( (resolve,reject)=>{
                if(checkPlatform.isIOS){ //IOS系统
                    // _method方法，_callback回调函数名称（绑定在window对象下，IOS调用回调函数才成功）
                    window.IOSCALLBACK = function(res){
                        resolve(res);
                        window.IOSCALLBACK = null;
                        return true;
                    }
                    window.webkit.messageHandlers.user.postMessage({"_method":"token","_callback":"IOSCALLBACK"});
                }else if(checkPlatform.isAndroid){ //Android系统
                    console.log('Android')
                    var res = device.getToken(); //device: 自定义的Android对象名
                    resolve(res);
                }else{
                    reject('error');
                }

            } )
        },

        getOrderCode:function(){

            return new Promise( (resolve,reject)=>{
                if(checkPlatform.isIOS){ //IOS系统
                    // _method方法，_callback回调函数名称（绑定在window对象下，IOS调用回调函数才成功）
                    window.IOSCALLBACK = function(res){
                        resolve(res);
                        window.IOSCALLBACK = null;
                        return true;
                    }
                    window.webkit.messageHandlers.pay.postMessage({"_method":"ordercode","_callback":"IOSCALLBACK"});
                }else if(checkPlatform.isAndroid){ //Android系统
                    console.log('Android')
                    var res = device.getOrderCode(); //device: 自定义的Android对象名
                    resolve(res);
                }else{
                    reject('error');
                }

            } )
        },



        goBack:function(){

            return new Promise( (resolve,reject)=>{
                if(checkPlatform.isIOS){ //IOS系统
                    window.webkit.messageHandlers.common.postMessage({"_method":"goback"});
                }else if(checkPlatform.isAndroid){ //Android系统
                    device.goBack(); //device: 自定义的Android对象名
                }else{
                    reject('error');
                }

            } )
        },

        screenshot:function(){
            return new Promise( (resolve,reject)=>{
                if(checkPlatform.isIOS){ //IOS系统
                    window.webkit.messageHandlers.common.postMessage({"_method":"screenshot"});
                }else if(checkPlatform.isAndroid){ //Android系统
                    device.screenshot(); //device: 自定义的Android对象名
                }else{
                    reject('error');
                }

            } )
        },

    }
    return new common();
})();
