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

let initMore = function(arr) {
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
        let arr = data[0].inteactivity
        initMore(arr)
        $('page').hide()
        $('#more').fadeIn()
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
