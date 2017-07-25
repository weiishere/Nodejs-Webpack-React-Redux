export default () => {
    //写cookies
    function setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }
    const getCookie = (name) => {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    if (!GetQueryString('loginName')) {
        location.href = 'https://ft.jdpay.com/account/auth?redirect=' + decodeURIComponent(location.href);
    } else {
        //写入cookie并重定向

    }
    return {
        loginName: setCookie('loginName'),
        merchantId: setCookie('merchantId'),
        auth: setCookie('auth')
    }
}