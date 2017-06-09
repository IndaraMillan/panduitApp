//test

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawVisualization);

checkForCookie();

var pointsUrl = API_URL + "/" + token + "/inputpoints";
var Counter = 0;
function drawVisualization() {
  // Some raw data (not necessarily accurate)
  var data = google.visualization.arrayToDataTable([
    ['Month', 'Performance', 'Goal'],
    ['January', 614.6, 165],
    ['February', 682, 135],
    ['March', 623, 157],
    ['April', 609.4, 139],
    ['May', 569.6, 136]
  ]);

  var options = {
    title: 'Monthly Production 2017',
    vAxis: { title: 'Points' },
    hAxis: { title: 'Month' },
    seriesType: 'bars',
    series: { 1: { type: 'line' } }
  };

  var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

var performancePicker = function () {
  $('#performanceFrom').datepicker();
  $('#performanceTo').datepicker();

}

//get a table with all request from today's date

var todayRequest = function () {


  var request = $.get(pointsUrl);

  request.done(function (data) {
    var arrayInputpoints = data.inputpoints;
    var arraylength = data.inputpoints.length;

    var email = getCookieValue("email");
    var date = getCookieValue("Date");

    var ndate = new Date();
    var mndate = ndate.getMonth() + 1;
    var dndate = ndate.getDate();
    var yndate = ndate.getFullYear();
    var Tdate = yndate + "-" + mndate + "-" + dndate;

    var tr;
    for (var i = 0; i < arraylength; i++) {

      var dbdate = new Date(arrayInputpoints[i].created_at);
      var mdate = dbdate.getMonth()+ 1;
      var ddate = dbdate.getDate();
      var ydate = dbdate.getFullYear();
      var Tdbdate = ydate + "-" + mdate + "-" + ddate;

     if (email == arrayInputpoints[i].email) {

      if (Tdate === Tdbdate) {
        tr = $('<tr/>');
        tr.append('<td>' + arrayInputpoints[i].ir + '</td>');
        tr.append('<td>' + arrayInputpoints[i].spa + '</td>');
        $('#history').append(tr);
         Counter++;
        $('#todayRequest').text("Today's request: "+ Counter);
      }
      }
    }


  });

  request.fail(function (data) {
    
  })
}

//sum points

var getSum = function () {

  var request = $.get(pointsUrl);

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

            var getPoints = arrayInputpoints[i].qyt * arrayInputpoints[i].activity;
            total += getPoints;
        }
      }
    }

    $("#total").text(totalG)

    var obj = { goal: 75, currentp: totalG };
    var tpercent = (obj.currentp * 100) / obj.goal;
    $("#progress").css('width', tpercent + '%').attr('aria-valuenow', tpercent).text(tpercent + "%");
    

  });

  request.fail(function (data) {
   
  })
}



