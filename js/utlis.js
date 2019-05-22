/**
 * Created by Administrator on 2018/9/25.
 */
/**
 * 通过类名获取元素
 * @param parentNode 父元素
 * @param className 类名
 * @returns {*} 父元素里面的所有类名为className的元素
 */
function getEleByClassName(parentNode, className) {
    if (parentNode.getElementsByClassName) {
        // IE9+
        return parentNode.getElementsByClassName(className);
    } else {
        // IE9一下
        // 只能获取全部然后筛选
//            var allList = parentNode.children;
        // 代表选中parentNode 里面的所有的标签
        var allList = parentNode.getElementsByTagName('*');
        var arr = [];
        for (var i = 0; i < allList.length; i++) {
            var ele = allList[i];
            if (ele.className == className) {
                arr.push(ele);
            }
        }
        return arr;
    }
}
/**
 * 通过选择器获取元素
 * @param selector 选择器
 * @returns {*} 获取到的元素
 */
function $(selector) {
    var list = document.querySelectorAll(selector);
    if (list.length == 1){
        return list[0];
    }
    var arr = [];
    for ( var i = 0; i<list.length; i++) {
        var li = list[i];
        arr.push(li);
    }
    return arr;
}
/**
 * 通过id名称获取标签
 * @param id
 * @returns {Element} 获取到的标签
 */
function $id(id) {
    return document.getElementById(id);
}
/**
 * 遍历
 * @param list 要遍历的数组/伪数组
 * @param callback 回调函数
 */
function each(list,callback) {
    for ( var i = 0; i<list.length; i++) {
        var li = list[i];
        callback(li,i,list);
    }
}
/**
 * 获取滚动距离
 */
function scroll() {
    if (window.pageXOffset || window.pageYOffset){
        // IE9 + 以及最新的浏览器
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        };
    }else if (document.documentElement.scrollTop || document.documentElement.scrollLeft){
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        };
    }else {
        return {
            // IE 6 以及下 怪异模式
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        };
    }
}
/**
 * 获取网页的可视区域的宽度和高度
 */
function client() {
    if (window.innerWidth || window.innerHeight){
        return {
            width:window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.documentElement.clientWidth || document.documentElement.clientHeight){
        return {
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        }
    }else {
        // 怪异模式
        return {
            width:document.body.clientWidth,
            height:document.body.clientHeight
        }
    }
}