//var API_URL = "http://127.0.0.1:3000/api";
var API_URL ="http://10.100.58.64:3000/api";
var loginUrl = API_URL + '/login' ;
var total = 0.00;
var login = function(form) {
    var payload = {
      email: form.email.value,
      password: form.password.value
    
    };

    var request = $.post(loginUrl, payload);
    
    request.done(function(data) {

      var date= new Date();
      var minutes= 60;
      date.setTime(date.getTime()+(minutes*60*1000));

      var expDate = moment.utc(date).format();
      console.log(moment(date).zone("-05:00" ).format());
      console.log(date.toISOString());
      var CurrDate = new Date();

      var expires = "; expires="+ expDate;
      console.log(expires);
      console.log(expDate);
      document.cookie = "token=" + data.token + expires +";path=/";
      document.cookie = "email=" + data.email + expires +";path=/";
      document.cookie = "id=" + data.id + expires +";path=/";
      document.cookie = "role_id=" + data.role_id + expires +";path=/";
      document.cookie = "userName=" + data.userName + expires +";path=/";
      document.cookie = "Date=" + CurrDate +";path=/";

var roleId= getCookieValue("role_id");
if(roleId!=1){

     window.location.href = "/panduit/userperformance.html";
      
}
else{
     window.location.href = "/panduit/performance.html";
}


    
    });

    request.fail(function(data) {

      var error = data.responseJSON.error;

      alert(error);
    });
}

var getCookieValue = function(name) {

  var cookies = document.cookie.split(';');
  var allCookies = {};

  for (i = 0; i < cookies.length; i++) {
    var cookieName = cookies[i].split('=')[0].trim();
    var cookieValue = cookies[i].split('=')[1];
    allCookies[cookieName] = cookieValue;
  }

  if (allCookies.hasOwnProperty(name)) {
    return allCookies[name];
  } else {
    return null;
  }
}

var checkForCookie = function() {
  if (!getCookieValue("token")) { 
            
            $.removeCookie('token', { path: '/' });
            $.removeCookie('Date', { path: '/' });
            $.removeCookie('email', { path: '/' });
            $.removeCookie('id', { path: '/' });
            $.removeCookie('role_id', { path: '/' });
            $.removeCookie('userName', { path: '/' });
            
    window.location.href = "/panduit/login.html";
  }
}



