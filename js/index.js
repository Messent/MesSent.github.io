/**
 * Created by Administrator on 2018/9/29.
 */
window.onload = function () {
    // 瀑布流布局
    fullWater();
    var timer1 = null;

    window.onscroll = function () {
        clearTimeout(timer1);
        timer1 = setTimeout(function () {
            var isLoad = checkNewImage();
            if (isLoad) {
                // 加载最新的盒子
                // 发送网络请求
                var data = [
                    {src: '1.jpg'},
                    {src: '11.jpg'},
                    {src: '21.jpg'},
                    {src: '31.jpg'},
                    {src: '40.jpg'},
                    {src: '20.jpg'}
                ];
                // 2.遍历数据
                for (var i = 0; i < data.length; i++) {
                    // 1.创建box
                    var box = document.createElement('div');
                    // 添加
                    $('#main').appendChild(box);
                    box.className = 'box';

                    // 2.创建pic
                    var pic = document.createElement('div');
                    box.appendChild(pic);
                    pic.className = 'pic';

                    // 3.创建image
                    var img = document.createElement('img');
                    pic.appendChild(img);
                    img.src = 'images/' + data[i].src;
                }
                // 3.子盒子布局
                fullWater();
            }
        },300);
    };

    // 函数节流 降低某个代码块调用的频率
    // 低级函数节流 用一定定时器
    var timer = null;

    // 响应式
    window.onresize = function () {
        clearTimeout(timer);

        // 刷新
        // 刷新当前界面 重新调用onload事件
        // window.location.reload();
        console.log(1);
        timer = setTimeout(function () {
            fullWater();
            console.log(2);
        },200);
    }
};
// 瀑布流布局
function fullWater() {
    // 1.父盒子居中
    // 动态 给main设置宽度
    // 宽度 = 盒子的宽度 * 列数
    // 列数 = parseInt(视口的宽度 / 盒子的宽度);

    // 1.1 获取盒子的宽度
    var allBox = $('#main .box');
    // 盒子的宽度
    var boxW = allBox[0].offsetWidth;

    // 1.2 列数
    var cols = parseInt(client().width / boxW);

    // 1.3 设置宽度
    $('#main').style.width = boxW * cols + 'px';

    // 2.子盒子定位
    /*
     * 瀑布流规则
     等宽不等高
     每次把下一个盒子拼接到
     最矮盒子的下面
     在外界定义个高度数组把
     第一行盒子的高度放在高度数组中
     每次从高度数组中找到最小值
     下一个盒子的
     c
     top = 数组中的最小值
     * */
    // 高度数组
    var arrH = [];

    each(allBox, function (ele, index) {
        // 第一行盒子不需要定位
        if (index < cols) {
            // 第一行
            // 第一行盒子的高度放在高度数组中
            arrH.push(ele.offsetHeight);
            // 清空行内样式
            ele.style = '';
        } else {
            // 不是第一行
            // 需要定位
            // 每次从高度数组中找到最小值
            var minH = _.min(arrH);
            // top = 数组中的最小值

            ele.style.top = minH + 'px';
            // left = 索引 * 盒子的宽度
            // 求出数组中的索引
            var minIndex = arrH.indexOf(minH);
            ele.style.left = minIndex * boxW + 'px';
            ele.style.position = 'absolute';

            // 更新高度数组
            arrH[minIndex] = minH + ele.offsetHeight;
        }
    });
}

// 判断要不要加载最新的盒子
// 当最后一个盒子的高度出现一半的时候需要加载最新的盒子
// 最后一个盒子的offsetTop + 最后一个盒子的高度的一半 <= 滚动距离 + 视口的高度
// 需要加载最新的盒子
/**
 * 判断要不要加载最新的盒子
 * @returns {boolean} true 加载最新的盒子 false 不加载
 */
function checkNewImage() {
    var allBox = $('#main .box');
    var lastIndex = allBox.length - 1;
    var lastBox = allBox[lastIndex];

    var isLoading = lastBox.offsetTop + lastBox.offsetHeight / 2 <= scroll().top + client().height;
    return isLoading;
}