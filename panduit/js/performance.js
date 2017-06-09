
var qty = 0;
var act = 0.0;
var nMessage = '';

//********** begin cookie verification **********************************************
checkForCookie();
var user = getCookieValue("userName");
$("#userName").text(user + ", kind reminder:");
var token = getCookieValue("token");

var userUrl = API_URL + "/" + token + "/addPoints";
var pointsUrl = API_URL + "/" + token + "/inputpoints";
// ************end cookie verification**************************************************
var request = $.get(pointsUrl);
var email = getCookieValue("email");

request.done(function (data) {
    var arrayInputpoints = data.inputpoints;
    var arraylength = data.inputpoints.length;

    var date = getCookieValue("Date");
    var ndate = new Date();
    var mndate = ndate.getMonth() + 1;
    var dndate = ndate.getDate();
    var yndate = ndate.getFullYear();
    var Tdate = yndate + "-" + mndate + "-" + dndate;
 

    for (var i = 0; i < arraylength; i++) {

        var dbdate = new Date(arrayInputpoints[i].created_at);
        var mdate = dbdate.getMonth() + 1;
        var ddate = dbdate.getDate();
        var ydate = dbdate.getFullYear();
        var Tdbdate = ydate + "-" + mdate + "-" + ddate;

        if (email == arrayInputpoints[i].email) {

            if (Tdate == Tdbdate) {
                var qty = arrayInputpoints[i].qty;
                var activity = arrayInputpoints[i].activity;
                var getPoints = qty * activity;
                total += getPoints;

            }
        }
    }

    $("#total").text(total);

    var gTotal = total.toFixed(2);

    var obj = { goal: 75, currentp: gTotal };
    var tpercent = ((obj.currentp * 100) / obj.goal).toFixed(2);
    $("#progress").css('width', tpercent + '%').attr('aria-valuenow', tpercent).text(tpercent + "%");
});

request.fail(function (data) {

})
//*************************************** begin dynamic table********************************************************** td:last-child   
var addColumn = function () {
    //append the new row here.
    var productiontable = $("#productiontable");
    productiontable.append('<tr id="table-columns">\
        <td> <input id = "ir" type="ir"  name = "ir" class="form control" placeholder="IR"></td>\
        <td> <input id = "spa"  type="spa"  name = "spa" class="form control" placeholder="SPA"></td>\
        <td> <input id = "qty"  onblur = "quantity(value)" type="qty"  name = "qty"class="form control" placeholder="QTY"></td>\
        <td class="btn-group">\
            <select id= "activity" name = "activity" onchange="activity(value)" class="btn btn-warning dropdown-toggle" data-toggle="dropdown">\
                <option name= "default" value = "0">PLEASE SELECT</option>\
                <option name = "addChange" value = "1">ADD/CHANGE</option>\
                <option name = "link" value = ".33">LINK</option>\
                <option name = "linkNew" value = ".66">LINK NEW</option>\
                <option name = "newSpa" value = "2.5">NEW</option>\
                <option name = "renewal" value = ".66">RENEWAL</option>\
                <option name = "renewalChange" value = "1">RENEWAL/CHANGE</option>\
                <option name = "colorAdd" value = "1.5">COLOR ADD</option>\
                <option name = "linkApproval" value = "1.25">LINK APPROVAL</option>\
                <option name = "rtrRenewal" value = "1.5">R2R/RENEWAL</option>\
                <option name = "cableRenewal" value = "1.5">CABLE/RENEWAL</option>\
                <option name = "ssRenewal" value = "2">SS/RENEWAL</option>\
                <option name = "Others" value = ".22">OTHER</option>\
            </select>\
        </td>\
        </tr>');

};


var save = function () {

    $("#bodyproduction").find('tr').each(function () {


        var val1 = $(this).find('td:eq(0) input[type="ir"]').val();
        var val2 = $(this).find('td:eq(1) input[type="spa"]').val();
        var val3 = $(this).find('td:eq(2) input[type="qty"]').val();
        var val4 = $(this).find('td:eq(3) select[onchange="activity(value)"]').val();



        var request = $.post(userUrl, { email: getCookieValue("email"), ir: val1, spa: val2, qty: val3, activity: val4 });

        checkForCookie();

        request.done(function (data) {
    
            window.location.href = "/panduit/performance.html";

        });

        request.fail(function (data) {
            var error = data.status;

            if (error === 401) {

                window.location.href = "/panduit/login.html";

            } else if (error === 500) {

                console.log(error);


            } else {

                window.location.href = "/panduit/login.html";
            }

        });


    });

}

/*
var update = function () {
    var newMessage = $("#newMessage").val();
    var putMessage = $.post(putMessageUrl, { message: newMessage });
    console.log(newMessage);
}*/

function quantity(value) {
    qty = parseInt(value);

}

function activity(value) {
    addColumn();

    act = parseFloat(value);
    total += act * qty;
    //
    totalG = total;
    $("#total").text(totalG)

    var obj = { goal: 75, currentp: totalG };
    var tpercent = (obj.currentp * 100) / obj.goal;
    $("#progress").css('width', tpercent + '%').attr('aria-valuenow', tpercent).text(tpercent + "%");


}


var redirecCharts = function () {

    window.location.href = "/panduit/charts.html";

}


var redirecTool = function () {

    window.location.href = "/panduit/performance.html";

}


var redirecMaps = function () {

    window.location.href = "/panduit/maps.html";

}