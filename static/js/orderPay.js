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
    getExtraList(order_code) {
        return request(
            'http://bs.paotui.com/v1/order/GetPayCode',
            {
                order_code,
            }
        )
    },


}
