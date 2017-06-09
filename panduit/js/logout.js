var logout = function (req,res) {
    var cookies = document.cookie;

            $.removeCookie('token', { path: '/' });
            $.removeCookie('Date', { path: '/' });
            $.removeCookie('email', { path: '/' });
            $.removeCookie('id', { path: '/' });
            $.removeCookie('role_id', { path: '/' });
            $.removeCookie('userName', { path: '/' });

    window.location.href = "/panduit/login.html";

}