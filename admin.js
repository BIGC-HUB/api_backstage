// let classify_name = '划水'
// let url = 'http://192.168.1.126:1337/activity/classify_find?classify_name=' + classify_name
let url = 'http://192.168.1.126:1337/activity/classify'
$('#find').html(`<script src="${url}" charset="utf-8"></script>`)

// 回调函数
window.ucloud = {
    find(data) {
        log('查询:',data)
    },
    classify(data) {
        log('分类:',data)
    },
}
