$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})

//所有ajax发送出去之前,都会调用这个函数
$.ajaxPrefilter(function (options) {
    //1添加根路径
    // console.log(options.url);
    options.url = baseUrl + options.url;
    //alert(options.url);

    //身份认证
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }

    // 3拦截所有响应,判断身份认证信息
    params.complete = function (res) {
        console.log(res.responseJSON)
        var obj = res.responseJSON;
        if(obj.status == 1 && obj.message == '身份认证失败!') {
            //1清空本地token
            localStorage.responseJSON("token");
            // 2页面跳转
            location.href = "/login.html";
        }
    }
})