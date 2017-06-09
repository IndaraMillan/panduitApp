var jMessage = 'ha';
var token = getCookieValue("token");
var readMessageUrl = API_URL + "/readMessage";
var putMessageUrl = API_URL + "/" + token + "/putMessage";


var message = $.get(readMessageUrl);

message.done(function (data) {
    var arrayMessage = message;
    var arraylength = message.length;

    for (var m = 0; m < arraylength; m++) {

        if (arraylength == arrayMessage[m].id) {
            var nMessage = arrayMessage[m].message;

             $("#teammesssage").text(nMessage);

        }

    }
});



var update = function () {
    
    var newMessage = $("#newMessage").val();
    var putMessage = $.post(putMessageUrl, { message: newMessage });

    nMessage = newMessage;
    $("#teammesssage").text(nMessage);
 
}

var teamUpdate = function(){

    $("#teammesssage").text(jMessage);

}