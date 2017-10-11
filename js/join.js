$('#join-btn').on('click', function() {
    let user = $('#join-user')
    let password = $('#join-password')
    let name = user.val()
    let key = password.val()
    // 账号
    if (name) {
        // 密码
        if (key) {
            Sea.Ajax({
                method: "get",
                url: "http://192.168.1.126:1337/user/logup",
                search: {
                    "username": name,
                    "password": key,
                },
            }).then(res => {
                let data = JSON.parse(res)
                if (Number(data.code) === 20000) {
                    alert(`注册成功，去登陆！\n\n用户名：${name}\n密　码：${key}\n`)
                    window.location = 'login.html'
                } else {
                    user.focus()
                    user.next().text(data.msg)
                    password.next().text('')
                }
            })
        } else {
            password.focus()
            return;
        }
    } else {
        user.focus()
        return;
    }

})
