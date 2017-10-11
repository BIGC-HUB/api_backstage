$('#login-btn').on('click', function() {
    let user = $('#login-user')
    let password = $('#login-password')
    let name = user.val()
    let key = password.val()
    // 账号
    if (name) {
        // 密码
        if (key) {
            Sea.Ajax({
                method: "get",
                url: "http://192.168.1.126:1337/user/login",
                search: {
                    "username": name,
                    "password": key,
                },
            }).then(res => {
                let data = JSON.parse(res)
                if (Number(data.code) === 20000) {
                    window.location = 'admin.html'
                } else {
                    if (Number(data.code) === 10002) {
                        password.next().text(data.msg)
                        user.next().text('')
                    } else {
                        user.next().text(data.msg)
                        password.next().text('')
                    }
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
