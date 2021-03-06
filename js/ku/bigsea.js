// 定制方法 / 函数
const log = console.log.bind(console)
// 测试函数
const ensure = function(def, result, message) {
    if(JSON.stringify(def) !== JSON.stringify(result)) {
        log('//', message)
        log(`×　|${def}|`)
        log(`√　|${result}|`)
    }
}

// Html标签去空格
String.prototype.html = function() {
    let html = this.slice(this.indexOf('<'))
    return html.replace(/>(\s+)</img, '><')
}
// bigsea.js
class Sea {
    constructor(select) {
        this.arr = Array.from(document.querySelectorAll(select))
    }
    static search(key) {
        let str = location.search
        let obj = {}
        let arr = str.slice(1).split('&')
        for(let i of arr) {
            let e = i.split('=')
            obj[e[0]] = e[1]
        }
        if (key) {
            return obj[key]
        } else {
            return obj
        }
    }

    static css(object, cls) {
        let o = object
        let s = ''
        for (var key in o) {
            let val = o[key]
            s += `${key}:${val};`
        }
        if (cls) {
            s = `${cls}{${s}}`
        }
        return s
    }

    static Ajax(request) {
        let req = {
             url: request.url,
             search: request.search || {},
             // data 传对象
             data: JSON.stringify(request.data) || null,
             method: (request.method || 'POST').toUpperCase(),
             header: request.header || {},
             contentType: request.contentType || 'application/json',
             callback: request.callback,
         }
         let r = new XMLHttpRequest()
         let promise = new Promise(function(success, fail) {
             // Search 查询
             let arr = []
             for (let k in req.search) {
                 let s = [k ,req.search[k]].join('=')
                 arr.push(s)
             }
             let url = req.url
             if (arr.length) {
                 url += '?' + arr.join('&')
             }
             // Ajax
             r.open(req.method, url, true)
             r.setRequestHeader('Content-Type', req.contentType)
             for (let key in req.header) {
                 r.setRequestHeader(key, req.header[key])
             }
             r.onreadystatechange = function() {
                 if (r.readyState === 4) {
                     let res = r.response
                     // Callback 回调函数
                     if (typeof req.callback === 'function') {
                         req.callback(res)
                     }
                     // Promise 成功
                     success(res)
                 }
             }
             r.onerror = function (err) {
                 fail(err)
             }
             if (req.method === 'GET') {
                 r.send()
             } else {
                 // POST
                 r.send(req.data)
             }
         })
         return promise
    }
}
window.eval = undefined
