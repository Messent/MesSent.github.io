const request = (url, data = {}, method = 'post') => {
    return new Promise((resolve,reject) => {
        $.ajax({
            url: url,
            type: method,
            dataType: 'json',
            data: data,
            headers: {
                key: sessionStorage.getItem('key')
            },
            success(res){
                resolve(res);
            },
            error(err) {
                reject(err);
            }
        });
    });
}
let orderPay = {
    //订单支付信息
    getOrderPremium(order_code) {
        return request(
            'http://bs.paotui.com/v1/order_premium/info',
            {
                order_code,
            }
        )
    },

    //刷新补差价二维码
    refreshOrderPremium(order_code) {
        return request(
            'http://bs.paotui.com/v1/orderPremium/refresh',
            {
                order_code,
            }
        )
    },


}
