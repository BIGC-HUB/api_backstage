// let classify_name = '划水'
// let url = 'http://192.168.1.126:1337/activity/classify_find?classify_name=' + classify_name
// let url = 'http://192.168.1.126:1337/activity/classify'
// $('#find').html(`<script src="${url}" charset="utf-8"></script>`)

// 回调函数
let get = function(url) {
    return new Promise(function(ok) {
        $.ajax({
           url: url,
           dataType:"jsonp",
           jsonp:"callback",
           type:"get",
           success:function(res){
               ok(res)
           }
       })
    })
}

let url = ''
// 分类
// url = 'http://192.168.1.126:1337/activity/classify'
// 查询
let classify_name = '骑马'
url = 'http://192.168.1.126:1337/activity/classify_find?classify_name=' + classify_name
// 获取
get(url).then(res => {
    log(res)
})
