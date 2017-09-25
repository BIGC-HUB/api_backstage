// 回调函数
let get = function(url) {
    return new Promise(function(ok) {
        Sea.Ajax({
            url: 'http://192.168.1.126:1337/activity/classify',
            method: "get",
        }).then(res => {
            ok(res)
        })
    })
}

let url = ''
// 查询
// url = 'http://192.168.1.126:1337/activity/classify_find?classify_name=骑马'
// 添加
// url = 'http://192.168.1.126:1337/activity/classify/add?classify_name=对象'
// 删除
// url = 'http://192.168.1.126:1337/activity/classify/delete?classify_name=对象'
// 获取

let bindEvent = function() {
    $('#classify').on('click', 'tag', function() {
        log(this)
    })
}

let initClass = function(url) {
    get(url).then(res => {
        let data = JSON.parse(res)
        let html = ''
        for (let e of data.classify) {
            html += `<tag data-name="${e}">${e}</tag>`
        }
        $('#classify').html(html)
    })
}
let __main = function() {
    // 分类
    initClass('http://192.168.1.126:1337/activity/classify')
    // 事件
    bindEvent()
}
__main()
