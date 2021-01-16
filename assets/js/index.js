$(function () {
    // 获取用户信息,并渲染用户名和头像
    getUserInfo()
})

// 2退出登录功能
var later = layui.layer;
$("#btnLogout").on("click", function () {
    //弹窗
    layer.confirm('是否确认退出登录'), { icon: 3, title: '提示' }, function (index) {
        //清空本地token
        localStorage.removeItem("tokem");
        // 、页面跳转
        localStorage = '/login.html';
        // 关闭询问框
        layer.close(index);
    }
})

// 封装一个获取用户信息,并渲染用户名和头像
// 注意:必须是全局函数,后面其他页面要用 !!!
function getUserInfo() {
    $.ajax({
        // 发送ajax
        method: 'GET',
        url: '/my/userinfo',
        //header 就是请求头配置对象
        // headers: {
        //     // 重新登录,因为token过去事件12小时
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            //渲染用户信息和头像
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    //渲染名称(nickname有限,如果没有,就用username)
    var name = user.nickname || user.username;
    $("#welcome").html("换用&nhsp;&nhsp;" + name);
    //2渲染头像
    if (user.user_pic !== null) {
        // 有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        // 没有头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".text-avatar").show().html(text);
    }
}