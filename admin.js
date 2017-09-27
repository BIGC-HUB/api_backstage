const back = []
// 回调函数
const get = function(url) {
    return new Promise(function(ok) {
        Sea.Ajax({
            url: url,
            method: "get",
        }).then(res => {
            ok(res)
        })
    })
}

let url = ''
// 查询
// url =
// 添加
// url = 'http://192.168.1.126:1337/activity/classify/add?classify_name=对象'
// 删除
// url = 'http://192.168.1.126:1337/activity/classify/delete?classify_name=对象'
// 获取

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

let initMore = function(data) {
    let arr = data.activitys
    let html = ''
    for(let i = 0; i < arr.length; i++) {
        let e = arr[i]
        html += `<box data-id="${e.id}">
            <img src="${e.info_img}">
            <text class="name"> ${e.info}</text>
            <text class="money"> ${e.price} </text>
            <text class="time"> ${e.time} </text>
        </box>`.html()
    }
    html += `
    <div class="btn-box">
        <button class="btn-next btn btn-red" type="button" name="button">下一页</button>
        <input class="now-page" data-max="${data.total}" type="phone" maxlength="3" value="${data.now}">
        <text>/${data.total}页</text>
        <button class="btn-jump btn btn-blue" type="button" name="button">跳转</button>
    </div>`.html()
    $('#more').html(html)
}

let initEdit = function(obj) {
    let type = ''
    let html = ''
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            if (key === '_type') {
                let arr = obj[key]
                for (let e of arr) {
                    type+= `
                    <type>${e.classify_name}</type>
                    `.html()
                }
            }
        } else {
            html += `
            <val>
                <text>${key}：</text>
                <input value="${obj[key]}" >
            </val>`.html()
        }
    }
    $('#edit').html(type + html)
}

let __main = function() {
    // 分类
    initClass('http://192.168.1.126:1337/activity/classify')
}
__main()


$('#classify').on('click', 'tag', function() {
    let name = this.dataset.name
    let url = 'http://192.168.1.126:1337/activity/classify_find?classify_name=' + name
    get(url).then(res => {
        let data = JSON.parse(res)
        initMore(data)
        $('page').hide()
        $('#more').fadeIn()
        $('#more')[0].dataset.classify_name = name
        back.push('#classify')
    })
})
$('#more').on('click', 'box', function() {
    let id = this.dataset.id
    let url = 'http://192.168.1.126:1337/activity/findone?act_id=' + id
    get(url).then(res => {
        let data = JSON.parse(res)
        initEdit(data)
        $('page').hide()
        $('#edit').fadeIn()
        back.push('#more')
    })
})
$('#top .btn-back').on('click', function(){
    if (back.length) {
        let last = back.splice(-1, 1)[0]
        $('page').hide()
        $(last).fadeIn()
    }
})
$('#more').on('blur', '.now-page', function() {
    let n = Number(this.value)
    let max = Number(this.dataset.max)
    if (n > max) {
        this.value = max
    }
    if (n < 0) {
        this.value = 0
    }
})
$('#more').on('click', '.btn-next', function() {
    let input = $('#more .now-page')[0]
    let max  = Number(input.dataset.max)
    let next = Number(input.value) + 1
    let name = $('#more')[0].dataset.classify_name
    let url = 'http://192.168.1.126:1337/activity/classify_find?classify_name=' + name
    if (next <= max) {
        url += '&page=' + next
        get(url).then(res => {
            let data = JSON.parse(res)
            initMore(data)
        })
    }
})
$('#more').on('click', '.btn-jump', function() {
    let input = $('#more .now-page')[0]
    let max = Number(input.dataset.max)
    let now = Number(input.value)
    let name = $('#more')[0].dataset.classify_name
    let url = 'http://192.168.1.126:1337/activity/classify_find?classify_name=' + name
    url += '&page=' + now
    get(url).then(res => {
        let data = JSON.parse(res)
        initMore(data)
    })
})
