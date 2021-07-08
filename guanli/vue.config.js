module.exports = {
    configureWebpack: {
        devServer: {
            // mock编写接口的地方
            before(app) {

                //模拟用户列表接口信息+分页
                var userlist = [{
                    "id": 10,
                    "UserName": "zs1",
                    "Password": "123456",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "",
                    "Mobile": "18888888888",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }, {
                    "id": 9,
                    "UserName": "zs2",
                    "Password": "123456",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "",
                    "Mobile": "18888888888",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }, {
                    "id": 8,
                    "UserName": "zs3",
                    "Password": "123456",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "",
                    "Mobile": "18888888888",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }, {
                    "id": 7,
                    "UserName": "zs4",
                    "Password": "555555",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "",
                    "Mobile": "13312311231",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }, {
                    "id": 6,
                    "UserName": "zs5",
                    "Password": "333333",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "",
                    "Mobile": "13388888888",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }, {
                    "id": 5,
                    "UserName": "zs6",
                    "Password": "222222",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "",
                    "Mobile": "13845644564",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }, {
                    "id": 4,
                    "UserName": "zs7",
                    "Password": "123456",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "",
                    "Mobile": "13845644564",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }, {
                    "id": 3,
                    "UserName": "zs8",
                    "Password": "",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "",
                    "Mobile": "13812341235",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }, {
                    "id": 2,
                    "UserName": "zs9",
                    "Password": "",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "",
                    "Mobile": "13812341888",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }, {
                    "id": 1,
                    "UserName": "zs10",
                    "Password": "123456",
                    "CreateTime": "0001/1/1 星期一 0:00:00",
                    "RoleName": "超级管理员",
                    "Mobile": "13602221234",
                    "Email": "405328555@qq.com",
                    "MgState": true
                }]

                app.get('/api/menu', (req, res) => {
                    res.json({

                        "status": "ok",
                        "data": [{
                            "id": 1,
                            "name": "用户管理",
                            "child": [{
                                "id": 1,
                                "name": "用户列表",
                                "path": "/home/users"
                            }]
                        }, {
                            "id": 2,
                            "name": "员工管理",
                            "child": [{
                                "id": 2,
                                "name": "员工列表",
                                "path": "/home/rote"
                            },]
                        }, {
                            "id": 3,
                            "name": "商品管理",
                            "child": [{
                                "id": 4,
                                "name": "商品列表",
                                "path": "/home/product"
                            }, {
                                "id": 5,
                                "name": "分类参数",
                                "path": "/home/userss"
                            }, {
                                "id": 6,
                                "name": "商品分类",
                                "path": "/home/producttype"
                            }]
                        }, {
                            "id": 4,
                            "name": "订单管理",
                            "child": []
                        }, {
                            "id": 5,
                            "name": "数据统计",
                            "child": []
                        }]
                    })
                })

                // 模拟 一个登录接口
                const tokenStr = 'dhclass'
                app.get('/api/login', (req, res) => {
                    const {
                        username,
                        password
                    } = req.query

                    if (username == 'admin' && password == '123456' ||
                        username == 'admin2' && password == '123456'
                    ) {
                        res.json({
                            code: 1,
                            message: '登录成功',
                            token: tokenStr + 'username' + username + (new Date().getTime)
                        })
                    } else {
                        res.json({
                            code: 0,
                            message: '登录失败'
                        })
                    }
                })
                // 用户数据请求接口(在mockjs写好数据，就要写一个接口让前端请求)
                app.get('/api/users', (req, res) => {
                    // 解构赋值前端传过来的参数 或者传递过来的数据信息
                    // query:'' 是我们还可以其他信息
                    const {
                        query,
                        pagenum,
                        pagesize
                    } = req.query
                    // 技术数据总数
                    var total = userlist.length
                    // 分页数据获取设置 一次获取多少条数据
                    var newdatalist = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)
                    // 返回给前端的数据
                    res.json({
                        "status": 'ok',
                        "total": total,
                        "data": newdatalist
                    })
                })

                // 状态按钮的请求接口
                app.get('/api/userupdate', (req, res) => {

                    const {
                        id,
                        MgState
                    } = req.query
                    var newState = ''
                    if (userlist) {
                        // 右边的id是传过来的
                        var user = userlist.filter((a) => {
                            a.id == id
                        })
                        // 右边的MgState是传过来的
                        user.MgState = MgState
                        newState = user.MgState
                    }
                    res.json({
                        'code': "200",
                        "newState": newState
                    })
                })

                // 搜索用户的接口
                app.get('/api/search', (req, res) => {
                    const {
                        query
                    } = req.query

                    var searchlist = [];

                    if (query != '') {
                        searchlist = userlist.filter(b =>
                            b.UserName == query
                        )
                    }
                    res.json({
                        'status': '200',
                        "data": searchlist
                    })
                })

                // 添加用户的接口
                app.get('/api/adduser', (req, res) => {
                    const {
                        username,
                        password,
                        email,
                        mobile,
                        pagenum,
                        pagesize
                    } = req.query
                    // 拿到userlist数组中最前面的id 因为不知道数据库中有多少条数据，传过来的id就不知道要传多少过来，就在这边获取最大的id,之后再加上1 就是连接上id的在数据库中的数值
                    var id = userlist[0].id
                    var adduser = {
                        "id": id + 1,
                        "UserName": username,
                        "Password": password,
                        "CreateTime": "0001/1/1 星期一 0:00:00",
                        "RoleName": "",
                        "Mobile": mobile,
                        "Email": email,
                        "MgState": true
                    }
                    userlist.unshift(adduser)

                    total = userlist.length
                    var newDataList = []
                    // 数据库有了变化 分页就要在重新分页
                    newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)

                    console.log('newDatalist', newDataList)
                    //向前端反馈的数据
                    res.json({
                        'total': total,
                        'data': newDataList
                    })
                })


                // 修改用户的接口

                app.get('/api/updateuser', (req, res) => {
                    console.log('进入了修改用户了')
                    const { id, username, password, email, mobile, pagenum, pagesize } = req.query
                    // [{
                    //     "id": 10,
                    //     "UserName": "zs1",
                    //     "Password": "123456",
                    //     "CreateTime": "0001/1/1 星期一 0:00:00",
                    //     "RoleName": "",
                    //     "Mobile": "18888888888",
                    //     "Email": "405328555@qq.com",
                    //     "MgState": true
                    // } ]     
                    userlist.filter(u => u.id == id).forEach(element => {
                        element.UserName = username
                        element.Email = email
                        element.Mobile = mobile

                    })

                    var total = userlist.length
                    newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)

                    console.log('newDatalist', newDataList)
                    //向前端反馈的数据
                    res.json({
                        'total': total,
                        'data': newDataList
                    })

                })

                // 删除用户的接口
                app.get('/api/deleteuser', (req, res) => {
                    const { id, pagenum, pagesize } = req.query

                    for (var i = 0; i < userlist.length; i++) {
                        if (userlist[i].id == id) {
                            userlist.splice(i, 1)
                        }
                    }

                    var total = userlist.length
                    
                    newDataList = userlist.slice((parseInt(pagenum) - 1) * pagesize, pagenum * pagesize)

                    console.log('newDatalist', newDataList)
                    //向前端反馈的数据
                    res.json({
                        'total': total,
                        'data': newDataList
                    })
                })
            }
        }
    }
}